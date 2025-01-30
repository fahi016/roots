<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "faheempktl@gmail.com";
    $subject = "New Project Inquiry from $name";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: $email";
    
    mail($to, $subject, $email_content, $headers);
    
    // Redirect back to the form
    header("Location: index.html?status=success");
}
?> 