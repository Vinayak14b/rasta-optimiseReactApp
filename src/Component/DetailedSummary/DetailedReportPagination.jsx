import React, { useEffect, useRef, useState } from "react";
import { border, styled } from "@mui/system";
import {
    TablePagination,
    tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { IconButton } from "@mui/material";
import increaseIcon from "../../assets/markers/increaseIcon.png";
import decreaseIcon from "../../assets/markers/decreaseIcon.png";
import { Spinner } from "../../utils/Spinner";

export default function TableCustomized({
    selectedRoad,
    setSelectedRoad,
    rows,
    rowsLoading,
}) {
    const rowsRef = useRef([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const roadAtIndex = rows?.indexOf(selectedRoad);
        if (selectedRoad && roadAtIndex >= 0) {
            setPage(parseInt(roadAtIndex / rowsPerPage));
            scrollToListItem(roadAtIndex - rowsPerPage * page);
        }
    }, [selectedRoad, rowsPerPage]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const scrollToListItem = (index) => {
        if (rowsRef.current[index]) {
            rowsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    };

    return (
        <Root className="upperSection" sx={{ width: "100%" }}>
            {rowsLoading ? (
                <Spinner height={"full"}/>
            ) : (
                <table aria-label="custom pagination table">
                    <thead>
                        <tr>
                            <th style={colWidth[1]}></th>
                            <th style={colWidth[2]}>Road No</th>
                            <th style={colWidth[3]}>Road Name</th>
                            <th style={colWidth[4]}>Start Chainage</th>
                            <th style={colWidth[5]}>End Chainage</th>
                            <th style={colWidth[6]}>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows && rows.length > 0 ? (
                            (rowsPerPage > 0
                                ? rows.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : rows
                            ).map((row, key) => (
                                <tr
                                    key={key}
                                    ref={(e) => (rowsRef.current[key] = e)}
                                >
                                    <td style={colWidth[1]} align="right">
                                        <input
                                            name="radioBtn"
                                            className="radioBtn"
                                            value={key}
                                            id={row?.roadName}
                                            style={{
                                                accentColor: orange[900],
                                                height: "1rem",
                                                width: "1rem",
                                            }}
                                            type="radio"
                                            checked={
                                                row?.roadName ===
                                                selectedRoad?.roadName
                                            }
                                            onChange={() => {
                                                setSelectedRoad(row);
                                            }}
                                        />
                                    </td>
                                    <td style={colWidth[2]} align="right">
                                        {row?.roadNo}
                                    </td>
                                    <td
                                        onClick={() => {
                                            setSelectedRoad(row);
                                        }}
                                        style={{
                                            ...colWidth[3],
                                            cursor: "pointer",
                                            color: `${
                                                row?.roadName ===
                                                selectedRoad?.roadName
                                                    ? orange[400]
                                                    : "#000"
                                            }`,
                                        }}
                                        align="right"
                                    >
                                        {row?.roadName}
                                    </td>
                                    <td style={colWidth[4]} align="right">
                                        {row?.startChainage}
                                    </td>
                                    <td style={colWidth[5]} align="right">
                                        {row?.endChainage}
                                    </td>
                                    <td style={colWidth[6]} align="right">
                                        {row?.isAscending === "0" ? (
                                            <DescendingBox></DescendingBox>
                                        ) : (
                                            <AscendingBox></AscendingBox>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    {"No Roads Available!"}
                                </td>
                            </tr>
                        )}

                        {emptyRows > 0 && (
                            <tr style={{ height: 34 * emptyRows }}>
                                <td colSpan={6} style={{border: 'none'}} aria-hidden />
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <CustomTablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: rows.length },
                                ]}
                                colSpan={6}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        "aria-label": "rows per page",
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                        slots: {
                                            firstPageIcon: FirstPageRoundedIcon,
                                            lastPageIcon: LastPageRoundedIcon,
                                            nextPageIcon:
                                                ChevronRightRoundedIcon,
                                            backPageIcon:
                                                ChevronLeftRoundedIcon,
                                        },
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </tr>
                    </tfoot>
                </table>
            )}
        </Root>
    );
}

const AscendingBox = () => {
    return (
        <span>
            Ascending
            <IconButton color="secondary" aria-label="ascending">
                <img src={increaseIcon} alt="increaseIcon" />
            </IconButton>
        </span>
    );
};

const DescendingBox = () => {
    return (
        <span>
            Descending
            <IconButton color="secondary" aria-label="ascending">
                <img src={decreaseIcon} alt="increaseIcon" />
            </IconButton>
        </span>
    );
};

const colWidth = {
    1: { width: "5%" },
    2: { width: "15%" },
    3: { width: "30%" },
    4: { width: "15%" },
    5: { width: "15%" },
    6: { width: "20%" },
};

const orange = {
    50: "#ffdd89",
    200: "#ffca48",
    400: "#f97316",
    900: "#e37302",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Root = styled("div")(
    ({ theme }) => `
  font-family: 'Poppins', sans-serif;
  flex: 1;
  margin: 0.5rem 0;
  border-radius: 12px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};

  table {
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    border-collapse: collapse;
    border: none;
    height: 100%;
    width: 100%;
  }
  
  tr {
    display: flex;
    width: 100%;  
  }
  
  tfoot > tr > td {
    border-top: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
    };
    border-bottom: none;
    width: 100%;
  }
  
  tbody {
    flex: 1;
    overflow-y: scroll;
  }

  td,
  th {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    border-bottom: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
    };
    text-align: left;
    padding: 0.5rem;
  }

  th {
    font-size: 1rem;
  }
  `
);

const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 2px 0 2px 4px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    border-radius: 6px; 
    background-color: transparent;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    transition: all 100ms ease;

    &:hover {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${
          theme.palette.mode === "dark" ? orange[400] : orange[200]
      };
      border-color: ${orange[400]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 6px;
    border: transparent;
    text-align: center;
  }

  & .${classes.actions} > button {
    display: flex;
    align-items: center;
    padding: 0;
    border: transparent;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    transition: all 120ms ease;

    > svg {
      font-size: 22px;
    }

    &:hover {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:focus {
      outline: 3px solid ${
          theme.palette.mode === "dark" ? orange[400] : orange[200]
      };
      border-color: ${orange[400]};
    }

    &:disabled {
      opacity: 0.3;
      &:hover {
        border: 1px solid ${
            theme.palette.mode === "dark" ? grey[800] : grey[200]
        };
        background-color: transparent;
      }
    }
  }
  `
);
