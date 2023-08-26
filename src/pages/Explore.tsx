import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/react';
import './Explore.css';
import { logoFacebook, mail, close } from 'ionicons/icons'; // Import the specific Facebook icon
import AppleIcon from '/Users/nicolemerriman/app-travel-tracker/graphics/appleicon.svg';

import debounce from 'lodash/debounce';


const Explore = () => {
  const iconStyle = {
    fontSize: '20px',
    width: '20px',
    verticalAlign: 'middle',
    marginRight: '20px',
  };

  const invertedColorStyle = {
    filter: 'invert(1)',
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState<string | null | undefined>('');
  const [password, setPassword] = useState<string | null | undefined>('');
  const [username, setUsername] = useState<string | null | undefined>('');

  const [loginUsername, setLoginUsername] = useState<string | null | undefined>('');
  const [loginPassword, setLoginPassword] = useState<string | null | undefined>('');

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const openLoginPrompt = () => {
    console.log('Sign In clicked');
    setShowLoginPrompt(true);
  };
  
  // Wrap the openLoginPrompt function with debounce
  const debouncedOpenLoginPrompt = debounce(openLoginPrompt, 300);
  
  // Attach the debounced function to the click event
  <a href="#" onClick={debouncedOpenLoginPrompt} style={{ color: 'white' }}>Sign In</a>
  
  
  const closeLoginPrompt = () => {
    console.log('Close button clicked');
    setShowLoginPrompt(false);
  };
  
  
  const openLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const openSignUp = () => {
    setShowSignUp(true);
  };

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleLogin = () => {
    // Add your authentication logic here
    console.log('Logging in with username:', loginUsername ?? '');
    // You can replace this with actual authentication code
    // For example, using Firebase, Auth0, or your backend API
  };

  const handleSignUp = () => {
    // Add your sign-up logic here
    console.log('Signing up with email:', email ?? '', 'username:', username ?? '');
    // You can replace this with actual sign-up code
    // For example, using Firebase, Auth0, or your backend API
  };

  const handleFacebookSignUp = () => {
    // Replace this with your Facebook authentication logic
    // Open a new window or redirect the user to the Facebook login page
    window.open('https://www.facebook.com/login', '_blank');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="landing-page">
        <div className="background-image">
          <div className="logo-container">
            <img src="graphics/landingpagelogo.png" alt="Logo" className="logo" />
          </div>
          <div className="transparent-box">
            <h1>Explore The World. One Adventure At A Time.</h1>
            <h2 className="landing__hero-subtitle">
              Plan, track, and relive your trips in a smart and beautiful way
            </h2>
            <IonGrid>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol size="12" size-md="5">
                  <a
                    href="https://www.facebook.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <IonButton
                      expand="full"
                      color="white"
                      fill="clear"
                      size="default"
                      className="transparent-button"
                      onClick={handleFacebookSignUp}
                    >
                      <div className="button-content">
                        <IonIcon slot="start" icon={logoFacebook} style={iconStyle} />
                        <span>Sign Up with Facebook</span>
                      </div>
                    </IonButton>
                  </a>
                </IonCol>
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol size="12" size-md="5">
                  <a
                    href="https://appleid.apple.com/sign-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <IonButton expand="full" color="white" fill="clear" size="default" className="transparent-button">
                      <div className="button-content">
                        <img src={AppleIcon} alt="Apple Icon" className="apple-icon" style={{ ...iconStyle, ...invertedColorStyle }} />
                        <span>Sign Up with Apple</span>
                      </div>
                    </IonButton>
                  </a>
                </IonCol>
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol size="12" size-md="5">
                  <IonButton
                    expand="full"
                    color="white"
                    fill="clear"
                    size="default"
                    className="transparent-button"
                    onClick={openSignUp} // Open sign-up modal
                  >
                    <IonIcon icon={mail} slot="start" style={iconStyle} /> Sign Up with Email
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol size="12" size-md="5">
                <div className="centered-text" style={{ color: 'white', boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2)' }}>
                    Already Have An Account? <a href="#" onClick={openLoginPrompt} style={{ color: 'white' }}> Sign In </a>
                </div>

                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>

      {/* Login Modal */}
      <IonModal isOpen={showLogin} onDidDismiss={closeLogin}>
        {/* ... Login modal content (unchanged) */}
      </IonModal>

      {/* Sign-Up Modal */}
      <IonModal isOpen={showSignUp} onDidDismiss={closeSignUp}>
        <IonContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IonButton fill="clear" onClick={closeSignUp}>
              <IonIcon icon={close} />
            </IonButton>
          </div>
          <h2 style={{ paddingLeft: '20px' }}>Sign Up</h2>
          <IonItem className="custom-padding">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email ?? ''}
              onIonChange={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem className="custom-padding">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              type="text"
              value={username ?? ''}
              onIonChange={(e) => setUsername(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem className="custom-padding">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password ?? ''}
              onIonChange={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>
          <IonCol size="6">
            <IonButton expand="full" onClick={handleSignUp}>
              Sign Up
            </IonButton>
          </IonCol>
        </IonContent>
      </IonModal>

      {/* Login Prompt Modal */}
      <IonModal isOpen={showLoginPrompt} onDidDismiss={closeLoginPrompt}>
        <IonContent>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IonButton fill="clear" onClick={closeLoginPrompt}>
              <IonIcon icon={close} />
            </IonButton>
          </div>
          <h2 style={{ paddingLeft: '20px' }}>Sign In</h2>
          <IonItem className="custom-padding">
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              type="text"
              value={loginUsername ?? ''}
              onIonChange={(e) => setLoginUsername(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem className="custom-padding">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={loginPassword ?? ''}
              onIonChange={(e) => setLoginPassword(e.detail.value ?? '')}
            />
          </IonItem>
          <IonCol size="6">
            <IonButton expand="full" onClick={handleLogin}>
              Sign In
            </IonButton>
          </IonCol>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Explore;
