async function testHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const text = await response.text();
    console.log("HEALTH STATUS:", response.status);
    console.log("HEALTH RESPONSE", text.slice(0, 50));
  } catch (err) {
    console.error("HEALTH FAILED", err);
  }
}

testHealth();
