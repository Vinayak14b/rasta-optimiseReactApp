import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

const DropdownBlock = ({
  heading,
  options,
  handleCheckboxChange,
  // category,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div
        className="flex gap-x-1 items-center w-50 p-2 box-border cursor-pointer"
        onClick={handleToggle}
        ref={anchorRef}
      >
        <p className="font-poppins">{`${heading}`}</p>

        {open ? (
          <AiFillCaretUp className="h-4 w-4" />
        ) : (
          <AiFillCaretDown className="h-4 w-4" />
        )}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCheckboxChange(option, index);
                      }}
                    >
                      <div className="flex gap-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={option.name}
                          checked={option.checked}
                          onChange={() => {
                            handleCheckboxChange(option, index);
                          }}
                        />
                        <p className="font-semibold font-poppins">
                          {option.name}
                        </p>
                      </div>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default DropdownBlock;
