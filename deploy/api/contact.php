<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Only POST is accepted."]);
    exit();
}

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);
if (!$data && !empty($_POST)) {
    $data = $_POST;
}
if (!$data) {
    $data = [];
}

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$company = isset($data['company']) ? trim($data['company']) : (isset($data['companyName']) ? trim($data['companyName']) : '');
$service = isset($data['service']) ? trim($data['service']) : (isset($data['claimType']) ? trim($data['claimType']) : (isset($data['assetType']) ? trim($data['assetType']) : 'General Consultation'));
$date = isset($data['date']) ? trim($data['date']) : '';
$slot = isset($data['slot']) ? trim($data['slot']) : '';
$notes = isset($data['notes']) ? trim($data['notes']) : (isset($data['message']) ? trim($data['message']) : (isset($data['comments']) ? trim($data['comments']) : ''));
$formType = isset($data['type']) ? trim($data['type']) : ($service ? 'service' : 'contact');

// 1. Database Storage (MySQL)
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'u686584126_kirsdb';
$dbPass = getenv('DB_PASSWORD') ?: 'Kirs@2026Db';
$dbName = getenv('DB_NAME') ?: 'u686584126_kirsdb';

try {
    $pdo = new PDO("mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Insert into contacts table
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, company, service, date, slot, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $company, $service, $date, $slot, $notes]);

    // Insert into queries table
    $stmtQueries = $pdo->prepare("INSERT INTO queries (type, name, email, phone, details) VALUES (?, ?, ?, ?, ?)");
    $stmtQueries->execute([$formType, $name ?: null, $email ?: null, $phone ?: null, json_encode($data, JSON_PRETTY_PRINT)]);

} catch (Exception $e) {
    error_log("KIRS PHP DB Error: " . $e->getMessage());
}

// 2. Build Comprehensive HTML Email
$to = getenv('SMTP_TO') ?: 'info@kirs.co.in';
$subject = "New Consultation Lead: " . strtoupper($formType) . " - " . ($name ?: $phone ?: $email);

$cleanRows = [];
$labels = [
    'name' => 'Full Name',
    'phone' => 'Phone Number',
    'email' => 'Email Address',
    'company' => 'Company / Entity',
    'companyName' => 'Company Name',
    'service' => 'Service Requested',
    'date' => 'Consultation Date',
    'slot' => 'Consultation Time Slot',
    'sharesHeld' => 'Shares / Folios Count',
    'estimatedShares' => 'Estimated Shares',
    'folioNumber' => 'Folio / Certificate No.',
    'claimType' => 'Claim / Holding Type',
    'holdingType' => 'Holding Type',
    'estimatedValue' => 'Estimated Value',
    'approxValue' => 'Approximate Value',
    'hasOldCertificates' => 'Has Physical Certificates?',
    'isDeceased' => 'Deceased / Inheritance Case?',
    'legalSuccessionStatus' => 'Legal Succession Status',
    'selectedDocs' => 'Checklist Documents',
    'notes' => 'Client Notes / Details',
    'message' => 'Message',
    'comments' => 'Comments'
];

foreach ($data as $key => $val) {
    if (is_array($val)) {
        $val = implode(', ', $val);
    } elseif (is_bool($val)) {
        $val = $val ? 'Yes' : 'No';
    }
    if ($val !== '' && $val !== null) {
        $label = isset($labels[$key]) ? $labels[$key] : ucfirst($key);
        $cleanRows[] = "<tr><td style='padding: 10px 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569; width: 38%; background-color: #fafafa;'>{$label}</td><td style='padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;'>" . htmlspecialchars($val) . "</td></tr>";
    }
}

$cleanRowsHtml = implode("\n", $cleanRows);
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);

$messageHtml = "
<!DOCTYPE html>
<html>
<head><meta charset='utf-8'><title>New Consultation Lead</title></head>
<body style=\"margin: 0; padding: 20px; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;\">
  <div style=\"max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;\">
    <div style=\"background: linear-gradient(135deg, #0B1920 0%, #17303B 100%); padding: 24px 28px; border-bottom: 3px solid #D4AF37;\">
      <h1 style=\"margin: 0 0 6px 0; color: #D4AF37; font-size: 20px; font-weight: 800; text-transform: uppercase;\">
        KALAVATI INVESTMENT & RECOVERY SERVICES
      </h1>
      <p style=\"margin: 0; color: #cbd5e1; font-size: 13px;\">New Website Lead Notification</p>
    </div>
    <div style=\"background-color: #f8fafc; padding: 14px 28px; border-bottom: 1px solid #e2e8f0;\">
      <span style=\"display: inline-block; background-color: #D4AF37; color: #0B1920; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;\">" . strtoupper($formType) . "</span>
      <span style=\"color: #64748b; font-size: 12px; float: right;\">" . date('d M Y, h:i A') . " IST</span>
    </div>
    <div style=\"padding: 24px 28px;\">
      <h2 style=\"margin: 0 0 16px 0; color: #0B1920; font-size: 16px; font-weight: 700; border-left: 4px solid #D4AF37; padding-left: 10px;\">
        Submitted Details
      </h2>
      <table style=\"width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;\">
        {$cleanRowsHtml}
      </table>
      <div style=\"margin-bottom: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;\">
        <p style=\"margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;\">Quick Actions</p>
        " . ($phone ? "<a href='tel:{$phone}' style='display: inline-block; margin: 4px; padding: 8px 16px; background-color: #0B1920; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;'>📞 Call</a>" : "") . "
        " . ($cleanPhone ? "<a href='https://wa.me/{$cleanPhone}' target='_blank' style='display: inline-block; margin: 4px; padding: 8px 16px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;'>💬 WhatsApp</a>" : "") . "
        " . ($email ? "<a href='mailto:{$email}' style='display: inline-block; margin: 4px; padding: 8px 16px; background-color: #D4AF37; color: #0B1920; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 700;'>✉️ Reply</a>" : "") . "
      </div>
    </div>
    <div style=\"background-color: #0B1920; color: #94a3b8; padding: 14px 28px; text-align: center; font-size: 12px;\">
      KIRS Automation &bull; 33/1B/1, Datta Nagar, Katraj, Pune 411046 &bull; <a href='https://kirs.co.in' style='color: #D4AF37; text-decoration: none;'>kirs.co.in</a>
    </div>
  </div>
</body>
</html>
";

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "From: KIRS Website <website@kirs.co.in>",
    "Reply-To: " . ($email ?: 'info@kirs.co.in'),
    "X-Mailer: PHP/" . phpversion()
];

@mail($to, $subject, $messageHtml, implode("\r\n", $headers));

echo json_encode(["success" => true, "message" => "Lead recorded and notification dispatched successfully."]);
?>
