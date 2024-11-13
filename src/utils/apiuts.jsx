const BASE_URL = "https://webfmsi.singapoly.com";

export const sendDataUTS = async (url, data) => {
  return fetch(BASE_URL + url, {
    method: "POST",
    body: data,
  })
    .then((response) =>
      response.status >= 200 &&
        response.status <= 299 &&
        response.status !== 204
        ? response.json()
        : response,
    )
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const getDataUTS = async (url) => {
  return fetch(BASE_URL + url)
    .then((response) =>
      response.status >= 200 &&
        response.status <= 299 &&
        response.status !== 204
        ? response.json()
        : response,
    )
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const deleteDataUTS = async (url) => {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "DELETE",
    });

    // Return response status for 204 (No Content) without parsing
    if (response.status === 204) {
      return { status: 204, message: "No Content" };
    }

    // Handle unauthorized status
    if (response.status === 401) {
      return { status: 401, isExpiredJWT: true };
    }

    // Handle successful responses in the 200-299 range
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return { status: response.status, ...data }; // Merge status with response data
    }

    // Return an object with the status for unexpected statuses
    return { status: response.status, message: "Unexpected status" };
  } catch (err) {
    console.log(err);
    throw err; // Re-throw error to be caught by caller
  }
};

export const loadImage = (image_path) => {
  return BASE_URL + "/public" + image_path;
};