import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import { StatefulButton } from '@openedx/paragon';

import { resetPassword } from './data/actions';
import messages from './messages';
import commonMessages from '../AccountSettingsPage.messages';
import ConfirmationAlert from './ConfirmationAlert';
import RequestInProgressAlert from './RequestInProgressAlert';

const ResetPassword = (props) => {
  const { email, status } = props;
  const intl = useIntl();

  return (
    <div className="account-setting-card account-setting-card--display account-setting-card--password form-group">
      <div className="account-setting-card__row">
        <div className="account-setting-card__copy">
          <h6 aria-level="3" className="account-setting-card__label">
            <FormattedMessage
              id="account.settings.editable.field.password.reset.label"
              defaultMessage="Mot de passe"
              description="The password label in account settings"
            />
          </h6>
          <p className="account-setting-card__value account-setting-card__value--accent">
            {intl.formatMessage(messages['account.settings.editable.field.password.reset.button'])}
          </p>
        </div>
        <StatefulButton
          className="account-setting-card__action account-setting-card__action--pill"
          variant="outline-primary"
          state={status}
          onClick={(e) => {
            if (status === 'pending') {
              e.preventDefault();
            }
            props.resetPassword(email);
          }}
          disabledStates={[]}
          labels={{
            default: intl.formatMessage(commonMessages['account.settings.editable.field.action.edit']),
          }}
        />
      </div>
      {status === 'complete' ? <ConfirmationAlert email={email} /> : null}
      {status === 'forbidden' ? <RequestInProgressAlert /> : null}
    </div>
  );
};

ResetPassword.propTypes = {
  email: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
  status: PropTypes.string,
};

ResetPassword.defaultProps = {
  email: '',
  status: null,
};

const mapStateToProps = state => state.accountSettings.resetPassword;

export default connect(
  mapStateToProps,
  {
    resetPassword,
  },
)(ResetPassword);
