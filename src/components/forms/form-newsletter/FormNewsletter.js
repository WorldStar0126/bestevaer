import React, {useState} from 'react';
import Script from 'next/script';
import classNames from 'classnames';
import Link from 'next/link';
import ButtonOutline from 'src/components/buttons/button-outline/ButtonOutline';
import InputCheckbox from 'src/components/inputs/input-checkbox/InputCheckbox';
import InputSelect from 'src/components/inputs/input-select/InputSelect';
import { isEmailValid } from 'src/utils/helpers';

import styles from './FormNewsletter.module.scss';
import InputRounded from 'src/components/inputs/input-rounded/InputRounded';
import MailchimpSubscribe from "react-mailchimp-subscribe";

export default function FormNewsletter({ className, title, submitLabel }) {
    // Form created in CreateSend, updated to work with React.
    // TODO: check a solution that uses a post with AJAX.

    const CustomForm = ({ status, message, onValidated }) => {
        let email, name;
        const submit = () =>
          email &&
          name &&
          email.value.indexOf("@") > -1 &&
          onValidated({
            EMAIL: email.value,
            NAME: name.value
          });
      
        return (
          <div className={classNames(styles.form, 'js-cm-form')}>
                <div>
                    <InputRounded className={styles.input}>
                        <input
                            aria-label="Name"
                            placeholder="First Name"
                            id="fieldName"
                            maxLength="200"
                            name="NAME"
                            ref={node => (name = node)}
                            required={true}
                        />
                    </InputRounded>

                    <InputRounded className={styles.input}>
                        <input
                            className="js-cm-email-input qa-input-email"
                            autoComplete="Email"
                            aria-label="Email"
                            placeholder="Email Address"
                            id="fieldEmail"
                            maxLength="200"
                            ref={node => (email = node)}
                            name="EMAIL"
                            required={true}
                            type="email"
                        />
                    </InputRounded>

                    <InputRounded className={styles.input}>
                        <label htmlFor="cm-privacy-consent" className='text-white'>
                            By clicking the subscribe button, I consent to having KM Yachtbuilders store my submitted information for marketing purposes. <Link href="https://www.bestevaer.com/privacy-policy" className='text-white' target="_blank">Our privacy policy.</Link>
                        </label>
                    </InputRounded>
                   
                    <input
                        id="cm-privacy-consent-hidden"
                        name="cm-privacy-consent-hidden"
                        type="hidden"
                        value={true}
                    />
                </div>

                <ButtonOutline
                    className={styles.button}
                    label={submitLabel}
                    type="submit"
                    onClick={submit}
                />
                {status === "sending" && <div className="mailchimp-status">sending...</div>}
                {status === "error" && (
                    <div
                        className="mailchimp-status"
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                {status === "success" && (
                    <div
                        className="mailchimp-status"
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}            
            
          </div>
        );
      };

    const postUrl = "https://kmy.us14.list-manage.com/subscribe/post?u=17d5a5808a83460d1c551c061&amp;id=a394b97739&amp;v_id=4354&amp;f_id=00d15ce0f0";
    return (
        <section className={className}>
            <h3 className={styles.heading}>
                {title}
            </h3>
            <div className="mc__form-container">
                <MailchimpSubscribe
                    url={postUrl}
                    render={({ subscribe, status, message }) => (
                        <CustomForm
                            status={status} 
                            message={message}
                            onValidated={formData => subscribe(formData)}
                        />
                    )}
                />
            </div>

        </section>
    );
}
