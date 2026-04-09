// Make.com form automation
  const API_URL = "https://jopad-backend.onrender.com";
  const form = document.getElementsByClassName("intake__form")[0];
  const formStatus = document.getElementById("status");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const formData = new FormData(form);
    
    const data = {
      intakeName: (formData.get("name") || "").trim(),
      intakeEmail: (formData.get("email") || "").trim(),
      intakeNumber: (formData.get("number") || "").trim(),
      intakeCompany: (formData.get("company") || "").trim(),
      intakeSubject: (formData.get("subject") || "").trim(),
      intakeMessage: (formData.get("message") || "").trim(),
      website: (formData.get("website") || "").trim()
    }
    if (data.website) { 
      formStatus.innerText = "Spam detected";
      formStatus.style.color = "red";
      return;
    }
    
    if (!data.intakeEmail || !data.intakeNumber || !data.intakeMessage) {
      formStatus.innerText = "Please complete all required fields.";
      formStatus.style.color = "red";
      return;
    }
    
    submitButton.disabled = true;
    formStatus.innerText = "Sending...";
    formStatus.style.color = "orange";
    
    try {
      const response = await fetch(`${API_URL}/api/intake/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission Failed");
      }
      formStatus.innerText = "Message sent successfully!";
      formStatus.style.color = "green";
      form.reset();
    } catch (err) {
      formStatus.innerText = "Error sending message. Please try again.";
      formStatus.style.color = "red";
      console.log("Fetch Error", err);
    } finally {
      submitButton.disabled = false;
      setTimeout(() => {
        formStatus.innerText = "";
      }, 5000);
    }
  });