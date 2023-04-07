import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const HeroIcon = ({ solid = false, iconName, className }) => {
  const Icon = solid ? SolidIcons[iconName] : OutlineIcons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
};

HeroIcon.propTypes = {
  solid: PropTypes.bool,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default HeroIcon;
