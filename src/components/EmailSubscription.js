import { useState } from "react";

function EmailSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const subscribed = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsSubscribed(false);
  };

  const handleInputFocus = () => {
    setIsSubscribed(false);
  };

  return (
    <footer className="bg-light text-center">
      <div className="container p-4 pb-0">
        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline mb-4">
                  <input
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={email}
                    type="email"
                    id="form5Example27"
                    className="form-control"
                  />
                  <label className="form-label">
                    Email address
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <button
                  disabled={!email}
                  onClick={subscribed}
                  className="btn mb-4"
                  style={{
                    backgroundColor: "#1565c0",
                    color: "#FFF",
                    boxShadow:
                      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                  }}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </footer>
  );
}

export default EmailSubscription;
