import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Hyperlink, StatefulButton } from '@openedx/paragon';

import Alert from '../Alert';
import { disconnectAuth } from './data/actions';

class ThirdPartyAuth extends Component {
  onClickDisconnect = (e) => {
    e.preventDefault();
    const providerId = e.currentTarget.getAttribute('data-provider-id');
    if (this.props.disconnectionStatuses[providerId] === 'pending') {
      return;
    }
    const disconnectUrl = e.currentTarget.getAttribute('data-disconnect-url');
    this.props.disconnectAuth(disconnectUrl, providerId);
  };

  renderUnconnectedProvider(url, name) {
    return (
      <div className="account-setting-card__row">
        <div className="account-setting-card__copy">
          <h6 aria-level="3" className="account-setting-card__label">{name}</h6>
          <p className="account-setting-card__value">
            <FormattedMessage
              id="account.settings.sso.account.disconnected"
              defaultMessage="Not connected"
              description="A badge to show that a third party account is not connected"
            />
          </p>
        </div>
        <Hyperlink destination={url} className="btn account-setting-card__action">
          <FormattedMessage
            id="account.settings.sso.link.account"
            defaultMessage="Connecter {name}"
            description="An action link to link a connected third party account.m {name} will be Google, Facebook, etc."
            values={{ name }}
          />
        </Hyperlink>
      </div>
    );
  }

  renderConnectedProvider(url, name, id) {
    const hasError = this.props.errors[id];

    return (
      <>
        {hasError ? (
          <Alert className="alert-danger">
            <FormattedMessage
              id="account.settings.sso.account.disconnect.error"
              defaultMessage="There was a problem disconnecting this account. Contact support if the problem persists."
              description="A message displayed when an error occurred while disconnecting a third party account"
            />
          </Alert>
        ) : null}

        <div className="account-setting-card__row">
          <div className="account-setting-card__copy">
            <h6 aria-level="3" className="account-setting-card__label">{name}</h6>
            <p className="account-setting-card__value">
              <FormattedMessage
                id="account.settings.sso.account.connected"
                defaultMessage="Connected"
                description="A badge to show that a third party account is linked"
              />
            </p>
          </div>
          <StatefulButton
            className="account-setting-card__action account-setting-card__action--pill"
            variant="outline-primary"
            state={this.props.disconnectionStatuses[id]}
            labels={{
              default: (
                <FormattedMessage
                  id="account.settings.sso.unlink.account"
                  defaultMessage="Disconnect"
                  description="An action link to unlink a connected third party account"
                  values={{ name }}
                />
              ),
            }}
            onClick={this.onClickDisconnect}
            disabledStates={[]}
            data-disconnect-url={url}
            data-provider-id={id}
          />
        </div>
      </>
    );
  }

  renderProvider({
    name, disconnectUrl, connectUrl, connected, id,
  }) {
    return (
      <div className="account-setting-card account-setting-card--display form-group" key={id}>
        {
          connected
            ? this.renderConnectedProvider(disconnectUrl, name, id)
            : this.renderUnconnectedProvider(connectUrl, name)
        }
      </div>
    );
  }

  renderNoProviders() {
    return (
      <FormattedMessage
        id="account.settings.sso.no.providers"
        defaultMessage="No accounts can be linked at this time."
        description="Displayed when no third-party accounts are available for the user to link to their account on the platform."
      />
    );
  }

  render() {
    if (this.props.providers === undefined) {
      return null;
    }

    if (this.props.providers.length === 0) {
      return this.renderNoProviders();
    }

    return this.props.providers.map(this.renderProvider, this);
  }
}

ThirdPartyAuth.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    disconnectUrl: PropTypes.string,
    connectUrl: PropTypes.string,
    connected: PropTypes.bool,
    id: PropTypes.string,
  })),
  disconnectionStatuses: PropTypes.objectOf(PropTypes.oneOf([null, 'pending', 'complete', 'error'])),
  errors: PropTypes.objectOf(PropTypes.bool),
  disconnectAuth: PropTypes.func.isRequired,
};

ThirdPartyAuth.defaultProps = {
  providers: undefined,
  disconnectionStatuses: {},
  errors: {},
};

const mapStateToProps = state => state.accountSettings.thirdPartyAuth;

export default connect(
  mapStateToProps,
  {
    disconnectAuth,
  },
)(ThirdPartyAuth);
