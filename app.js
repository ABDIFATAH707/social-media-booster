document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const platform = document.getElementById('platform').value;
      const targetUrl = document.getElementById('target-url').value;
      const actionType = document.getElementById('action-type').value;
      const quantity = parseInt(document.getElementById('quantity').value);
      
      if (!targetUrl) {
        alert('Please enter a valid URL');
        return;
      }
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting...';
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 1, // Demo user
            platform,
            action_type: actionType,
            quantity,
            target_url: targetUrl
          })
        });
        const result = await response.json();
        if (response.ok) {
          showResult(`Task submitted (ID: ${result.task_id}). Status: ${result.status}. Cost: $
 {result.cost} credits.`, 'alert-success');
        } else {
          showResult(result.error, 'alert-danger');
      }
        }
 catch (error) {
 showResult('Error submitting task', 'alert-danger');
 } finally {
        submitBtn.disabled = false;
 submitBtn.innerHTML = 'Submit Task';
      }
    });
  }
 });
 function showResult(message, alertClass) {
 const resultSection = document.getElementById('result-section');
 const resultMessage = document.getElementById('result-message');
 resultMessage.innerHTML = message;
 resultMessage.className = `alert ${alertClass}`;
  resultSection.classList.remove('d-none');
 }