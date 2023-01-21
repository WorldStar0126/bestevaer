import React from 'react';
import Script from 'next/script';
import classNames from 'classnames';
import Link from 'next/link';
import ButtonOutline from 'src/components/buttons/button-outline/ButtonOutline';
import InputCheckbox from 'src/components/inputs/input-checkbox/InputCheckbox';
import InputSelect from 'src/components/inputs/input-select/InputSelect';

import { isEmailValid } from 'src/utils/helpers';

import styles from './FormNewsletter.module.scss';
import InputRounded from 'src/components/inputs/input-rounded/InputRounded';

export default function FormNewsletter({ className, title, submitLabel }) {
    // Form created in CreateSend, updated to work with React.
    // TODO: check a solution that uses a post with AJAX.

    return (
        <section className={className}>
            <h3 className={styles.heading}>
                {title}
            </h3>

            <form
                className={classNames(styles.form, 'js-cm-form')}
                id="mc-embedded-subscribe-form"
                action="https://kmy.us14.list-manage.com/subscribe/post?u=17d5a5808a83460d1c551c061&amp;id=a394b97739&amp;v_id=4354&amp;f_id=00d15ce0f0"
                method="post" 
            >
                <div id="mc_embed_signup_scroll">
                    <InputRounded className={styles.input}>
                        <input
                            aria-label="Name"
                            placeholder="First Name"
                            id="mce-FNAME"
                            maxLength="200"
                            name="FNAME"
                            required={true}
                        />
                    </InputRounded>

                    <InputRounded className={styles.input}>
                        <input
                            className="js-cm-email-input qa-input-email"
                            autoComplete="Email"
                            aria-label="Email"
                            placeholder="Email Address"
                            id="mce-EMAIL"
                            maxLength="200"
                            name="EMAIL"
                            required={true}
                            type="email"
                        />
                    </InputRounded>

                    <InputCheckbox className={styles.inputCheckbox}>
                        <input
                            aria-required={true}
                            id="cm-privacy-consent"
                            className="av-checkbox"
                            name="gdpr[195642]"
                            required={true}
                            type="checkbox"
                        />

                        <label htmlFor="cm-privacy-consent">
                            I agree your&nbsp; <a href="https://www.bestevaer.com/privacy-policy" target="_blank">privacy policy.</a>
                        </label>
                    </InputCheckbox>

                </div>

                <ButtonOutline
                    id="mc-embedded-subscribe"
                    className={styles.button}
                    label={submitLabel}
                    type="submit"
                />
            </form>

            <Script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></Script>
        </section>
    );
}
