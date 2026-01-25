'use client';

import { useState } from 'react';
import ContactFormMobile from './ContactFormMobile';

export default function LetsCollabMobile() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="lets-collab-mobile">
        <div className="collab-content-mobile">
          <div className="collab-badge-mobile">Start here for better future</div>
          
          <h2 className="collab-title-mobile">
            Let's collab
            <br />
            <span className="collab-highlight">together</span>
          </h2>
          
          <p className="collab-description-mobile">
            We craft design experiences that leave a lasting impression—bold, purposeful, and deeply human.
          </p>
          
          <button 
            className="collab-button-mobile"
            onClick={() => setIsFormOpen(true)}
          >
            <span>Get in touch</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <ContactFormMobile isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
