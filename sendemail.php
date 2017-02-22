<?php

// Define some constants
define( "RECIPIENT_NAME", "Autocouture" );
define( "RECIPIENT_EMAIL", "andlobach@gmail.com" );



// Read the form values
$success = false;


$senderName = isset( $_POST['name'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$subject = isset( $_POST['subject'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['subject'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $senderName && $senderEmail && $message ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";

  $headers = "From: " . $senderName . " <" . $senderEmail . ">";
  $success = mail( $recipient, $subject, $message, $headers );

  echo "<p class='success'>Thanks for contacting us. We will contact you ASAP!</p>";
}

?>