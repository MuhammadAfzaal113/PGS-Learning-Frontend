import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'

// Map semantic sizes to numeric pixels for MUI CircularProgress
const SIZE_MAP = {
  small: 20,
  medium: 40,
  large: 60,
}

export default function Loader({ size = 'medium', thickness = 4, color = 'primary', sx, ...props }) {
  const px = SIZE_MAP[size] || SIZE_MAP.medium

  return (
    <CircularProgress
      size={px}
      thickness={thickness}
      color={color}
      sx={{ verticalAlign: 'middle', ...sx }}
      {...props}
    />
  )
}

Loader.propTypes = {
  // one of 'small' | 'medium' | 'large'
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  // thickness of the circle stroke
  thickness: PropTypes.number,
  // MUI color (primary, secondary, inherit, etc.)
  color: PropTypes.string,
  // sx overrides for the underlying component
  sx: PropTypes.object,
}

Loader.defaultProps = {
  size: 'medium',
  thickness: 4,
  color: 'primary',
  sx: {},
}
