import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";

function ShareRecipe() {
  const location= useLocation();
  const url = String(window.location.origin + location.pathname);
  // const url = String(window.location.href);
  const message = "Hey, check out this recipe from NutriMate!";

  return (
    <div>
      <h5>Share this recipe on</h5>
      <FacebookShareButton url={url}>
        <MDBIcon fab icon="facebook" size="lg" title="Facebook" color='secondary' />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={message}>
        <MDBIcon fab icon="twitter" size="lg" className="ms-2" title="Twitter" color='secondary' />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={message}>
        <MDBIcon fab icon="whatsapp" size="lg" className="ms-2" title="WhatsApp" color='secondary' />
      </WhatsappShareButton>

      <TelegramShareButton url={url} title={message}>
        <MDBIcon fab icon="telegram-plane" size="lg" className="ms-2" title="Telegram" color='secondary' />
      </TelegramShareButton>

      <EmailShareButton url={url} subject={message}>
        <MDBIcon far icon="envelope" size="lg" className="ms-2" title="Email" color='secondary' />
      </EmailShareButton>
    </div>
  );
}

export default ShareRecipe;
