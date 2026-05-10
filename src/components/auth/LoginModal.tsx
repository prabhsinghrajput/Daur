"use client";

import React, { useState } from 'react';
import styles from './LoginModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type AuthStep = 'phone' | 'otp' | 'success';

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpVerify = () => {
    setStep('success');
    setTimeout(() => {
      onSuccess();
      onClose();
      // Reset for next time
      setStep('phone');
      setPhone('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          className={styles.modal} 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button className={styles.closeBtn} onClick={onClose}>
            <IoCloseOutline />
          </button>

          <div className={styles.leftSide}>
            <div className={styles.logo}>DAUR</div>
            <h2>Welcome!</h2>
          </div>

          <div className={styles.rightSide}>
            <AnimatePresence mode="wait">
              {step === 'phone' && (
                <motion.div 
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={styles.formContent}
                >
                  <h1>Login/Signup</h1>
                  <p className={styles.subtext}>Enter Mobile Number</p>
                  
                  <form onSubmit={handlePhoneSubmit}>
                    <div className={styles.inputWrapper}>
                      <div className={styles.countryCode}>
                        <img src="https://flagcdn.com/w20/in.png" alt="IN" />
                        <span>+91</span>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Enter Mobile Number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        autoFocus
                      />
                    </div>
                    
                    <p className={styles.disclaimer}>
                      By logging in, you're agreeing to our <br />
                      <span>Privacy Policy Terms of Service</span>
                    </p>

                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                      disabled={phone.length !== 10}
                    >
                      Continue
                    </button>
                  </form>
                  <button className={styles.troubleLink}>Trouble logging in?</button>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={styles.formContent}
                >
                  <h1>OTP Verification</h1>
                  <p className={styles.subtext}>
                    We have sent verification code to <br />
                    <strong>+91 {phone}</strong> <span className={styles.editLink} onClick={() => setStep('phone')}>Edit</span>
                  </p>
                  
                  <div className={styles.otpGrid}>
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        className={styles.otpInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && index < 3) {
                            document.getElementById(`otp-${index + 1}`)?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <p className={styles.resendText}>Resend OTP in 28 Sec</p>

                  <button className={styles.submitBtn} onClick={handleOtpVerify}>
                    Verify
                  </button>
                  
                  <button className={styles.troubleLink}>Trouble logging in?</button>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.successContent}
                >
                  <div className={styles.confetti}>🎉</div>
                  <h1>Congratulations!</h1>
                  <p>You are Successfully Logged in!</p>
                  <div className={styles.loader}>
                    <div className={styles.loaderBar}></div>
                  </div>
                  <p className={styles.loaderText}>Availing the best deals</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
