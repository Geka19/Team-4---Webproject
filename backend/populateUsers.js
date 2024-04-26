// This is just for testing purposes will probably be removed in final version
fetch('http://localhost:8050/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'Sebastian',
    email: 'sebastian@email.com',
    password: '7F!9xZ12'
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});