const auth = (code: string): Promise<{ email: string }> => {
  const body = {
    code,
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CB_URL,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'authorization_code',
  };

  return new Promise(async (resolve, reject) => {
    fetch(process.env.GOOGLE_ACCESS_TOKEN_URL as string, {
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.ok && res.json())
      .then((res) => {
        if (res?.id_token) {
          fetch(`${process.env.GOOGLE_TOKEN_INFO_URL as string}?id_token=${res.id_token}`)
            .then((res) => res.json())
            .then(async (data) => {
              resolve(data);
            })
            .catch(() => {
              reject(new Error('Authentication error'));
            });
        }
      })
      .catch(() => reject(new Error('Authentication error')));
  });
};

export const OAuthService = { auth };
