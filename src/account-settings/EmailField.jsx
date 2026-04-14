import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import {
  Button, StatefulButton, Form, Tooltip, OverlayTrigger,
} from '@openedx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Alert from './Alert';
import SwitchContent from './SwitchContent';
import messages from './AccountSettingsPage.messages';

import {
  openForm,
  closeForm,
} from './data/actions';
import { editableFieldSelector } from './data/selectors';

const EmailField = (props) => {
  const {
    name,
    label,
    emptyLabel,
    value,
    saveState,
    error,
    confirmationMessageDefinition,
    confirmationValue,
    helpText,
    onEdit,
    onCancel,
    onSubmit,
    onChange,
    isEditing,
    isEditable,
  } = props;
  const id = `field-${name}`;
  const cardClassName = `account-setting-card--${name.replace(/_/g, '-')}`;
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, new FormData(e.target).get(name));
  };

  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  const handleEdit = () => {
    onEdit(name);
  };

  const handleCancel = () => {
    onCancel(name);
  };

  const renderConfirmationMessage = () => {
    if (!confirmationMessageDefinition || !confirmationValue) {
      return null;
    }
    return (
      <Alert
        className="alert-warning mt-n2"
        icon={<FontAwesomeIcon className="mr-2 h6" icon={faExclamationTriangle} />}
      >
        <h6 aria-level="3">
          {intl.formatMessage(messages['account.settings.email.field.confirmation.header'])}
        </h6>
        {intl.formatMessage(confirmationMessageDefinition, { value: confirmationValue })}
      </Alert>
    );
  };

  const renderConfirmationValue = () => (
    <span>
      {confirmationValue}
      <span className="ml-3 text-muted small">
        <FormattedMessage
          id="account.settings.email.field.confirmation.header"
          defaultMessage="Pending confirmation"
          description="The label next to a new pending email address"
        />
      </span>
    </span>
  );

  const renderEmptyLabel = () => {
    if (isEditable) {
      return <Button variant="link" onClick={handleEdit} className="p-0">{emptyLabel}</Button>;
    }
    return <span className="text-muted">{emptyLabel}</span>;
  };

  const renderValue = () => {
    if (confirmationValue) {
      return renderConfirmationValue();
    }
    return value || renderEmptyLabel();
  };

  return (
    <SwitchContent
      expression={isEditing ? 'editing' : 'default'}
      cases={{
        editing: (
          <div className={classNames('account-setting-card', 'account-setting-card--editing', cardClassName)}>
            <form onSubmit={handleSubmit}>
            <Form.Group
              controlId={id}
              isInvalid={error != null}
              className="account-setting-card__form-group"
            >
              <Form.Label className="h6 d-block account-setting-card__label" htmlFor={id}>{label}</Form.Label>
              <Form.Control
                data-hj-suppress
                name={name}
                id={id}
                type="email"
                value={value}
                onChange={handleChange}
              />
              {!!helpText && <Form.Text>{helpText}</Form.Text>}
              {error != null && <Form.Control.Feedback hasIcon={false}>{error}</Form.Control.Feedback>}
            </Form.Group>
            <div className="account-setting-card__form-actions">
              <StatefulButton
                type="submit"
                className="mr-2 account-setting-card__save"
                state={saveState}
                labels={{
                  default: intl.formatMessage(messages['account.settings.editable.field.action.save']),
                }}
                onClick={(e) => {
                  // Swallow clicks if the state is pending.
                  // We do this instead of disabling the button to prevent
                  // it from losing focus (disabled elements cannot have focus).
                  // Disabling it would causes upstream issues in focus management.
                  // Swallowing the onSubmit event on the form would be better, but
                  // we would have to add that logic for every field given our
                  // current structure of the application.
                  if (saveState === 'pending') { e.preventDefault(); }
                }}
                disabledStates={[]}
              />
              <Button
                variant="outline-primary"
                onClick={handleCancel}
                className="account-setting-card__cancel"
              >
                {intl.formatMessage(messages['account.settings.editable.field.action.cancel'])}
              </Button>
            </div>
            </form>
          </div>
        ),
        default: (
          <div className={classNames('account-setting-card', 'account-setting-card--display', cardClassName, 'form-group')}>
            <div className="account-setting-card__row">
              <div className="account-setting-card__copy">
                <h6 aria-level="3" className="account-setting-card__label">{label}</h6>
                <OverlayTrigger
                  placement="top"
                  overlay={(
                    <Tooltip id={`tooltip-${name}`} variant="light" className="d-sm-none">
                      {renderValue()}
                    </Tooltip>
                  )}
                >
                  <p data-hj-suppress className="account-setting-card__value text-truncate">{renderValue()}</p>
                </OverlayTrigger>
                {renderConfirmationMessage() || <p className="account-setting-card__help">{helpText}</p>}
              </div>
              {isEditable ? (
                <Button variant="link" onClick={handleEdit} className="account-setting-card__action">
                  <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
                  {intl.formatMessage(messages['account.settings.editable.field.action.edit'])}
                </Button>
              ) : null}
            </div>
          </div>
        ),
      }}
    />
  );
};

EmailField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  emptyLabel: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  saveState: PropTypes.oneOf(['default', 'pending', 'complete', 'error']),
  error: PropTypes.string,
  confirmationMessageDefinition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  confirmationValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helpText: PropTypes.node,
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  isEditable: PropTypes.bool,
};

EmailField.defaultProps = {
  value: undefined,
  saveState: undefined,
  label: undefined,
  emptyLabel: undefined,
  error: undefined,
  confirmationMessageDefinition: undefined,
  confirmationValue: undefined,
  helpText: undefined,
  isEditing: false,
  isEditable: true,
};

export default connect(editableFieldSelector, {
  onEdit: openForm,
  onCancel: closeForm,
})(EmailField);
