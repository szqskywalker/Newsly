// Call the different backend API's

export async function callVerifyAPI(
  userid,
  password,
  setResponseMessage,
  proceed
) {
  try {
    const response = await fetch("http://localhost:8000/get_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userid, password: password }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify user");
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Set response message to be displayed
    setResponseMessage(data.message || "Unknown response from server");
    if (data.status === 200) {
      proceed(true);
    }

    return data;
  } catch (error) {
    console.error("Error verifying user:", error);
    setResponseMessage("Error verifying user. Please try again.");
  }
}

export async function callNewUserAPI(
  userid,
  email,
  password,
  setResponseMessage,
  proceed
) {
  try {
    const response = await fetch("http://localhost:8000/save_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userid,
        user_pwd: password,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Set response message to be displayed
    setResponseMessage(data.message || "Unknown response from server");
    if (data.status === 200) {
      proceed(true);
    }

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    setResponseMessage("Error creating user. Please try again.");
  }
}
