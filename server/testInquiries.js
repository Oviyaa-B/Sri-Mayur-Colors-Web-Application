async function testInquiries() {
  try {
    const response = await fetch('http://localhost:5000/api/inquiries');
    const text = await response.text();
    console.log("INQUIRIES STATUS:", response.status);
    console.log("INQUIRIES RESPONSE START:", text.slice(0, 50));
  } catch (err) {
    console.error("INQUIRIES FAILED", err);
  }
}

testInquiries();
