async function testLoginText() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@srimayur.com',
        password: 'password123'
      })
    });
    const text = await response.text();
    console.log("LOGIN STATUS:", response.status);
    console.log("LOGIN RESPONSE START:", text.slice(0, 100));
  } catch (err) {
    console.error("LOGIN FAILED", err);
  }
}

testLoginText();
