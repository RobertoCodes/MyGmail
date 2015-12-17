class EmailMailer < ApplicationMailer

	def send_email (email, name)
		from_str = name + " <" + email.sender_email + ">"
		mail(to: email.recipient_email, subject: email.subject, content_type: "text/html",
			from: from_str, body: email.body)
	end


end
