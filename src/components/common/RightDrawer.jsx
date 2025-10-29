import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

export default function RightDrawer({ open, onClose, title, width = 480, children }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose} size="small" aria-label="close drawer">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2, overflow: 'auto', flex: 1 }}>{children}</Box>
      </Box>
    </Drawer>
  )
}

RightDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  children: PropTypes.node,
}

RightDrawer.defaultProps = {
  title: '',
  width: 480,
}
