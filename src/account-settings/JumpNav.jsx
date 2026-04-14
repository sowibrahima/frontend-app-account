import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Bell,
  Globe,
  Link2,
  PencilLine,
  Shield,
  Trash2,
  UserRound,
} from 'lucide-react';
import classNames from 'classnames';
import messages from './AccountSettingsPage.messages';

const JumpNav = ({ activeSection, onSelectSection }) => {
  const intl = useIntl();

  const items = [
    {
      id: 'basic-information',
      icon: UserRound,
      label: intl.formatMessage(messages['account.settings.section.account.information']),
    },
    {
      id: 'profile-information',
      icon: PencilLine,
      label: intl.formatMessage(messages['account.settings.section.profile.information']),
    },
    {
      id: 'social-media',
      icon: Link2,
      label: intl.formatMessage(messages['account.settings.section.social.media']),
    },
    {
      id: 'notifications',
      icon: Bell,
      label: intl.formatMessage(messages['notification.preferences.notifications.label']),
    },
    {
      id: 'site-preferences',
      icon: Globe,
      label: intl.formatMessage(messages['account.settings.section.site.preferences']),
    },
    {
      id: 'linked-accounts',
      icon: Shield,
      label: intl.formatMessage(messages['account.settings.section.linked.accounts']),
    },
  ];

  if (getConfig().ENABLE_ACCOUNT_DELETION) {
    items.push({
      id: 'delete-account',
      icon: Trash2,
      label: intl.formatMessage(messages['account.settings.jump.nav.delete.account']),
      destructive: true,
    });
  }

  return (
    <nav className="account-settings-nav" aria-label={intl.formatMessage(messages['account.settings.page.heading'])}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={classNames('account-settings-nav__item', {
              'is-active': isActive,
              'is-destructive': item.destructive,
            })}
            onClick={() => onSelectSection(item.id)}
          >
            <Icon className="account-settings-nav__icon" size={16} strokeWidth={2} />
            <span className="account-settings-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

JumpNav.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSelectSection: PropTypes.func.isRequired,
};

export default JumpNav;
