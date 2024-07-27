import { React, useState, useRef, useEffect } from "react";
import { DetailedReportIcons } from "../../assets/IconArray";
import Fuse from "fuse.js";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Spinner } from "../../utils/Spinner";

function DetailedReportSearchBox({
    selectedRoad,
    setSelectedRoad,
    rows,
    rowsLoading,
}) {
    const inputRef = useRef(null);
    const [searchText, setSearchText] = useState(selectedRoad?.roadName || "");
    const [listPlace, setListPlace] = useState([]);
    const [searchBoxActive, setSearchBoxActive] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searchBarBoxRef = useRef(null);
    const listItemRefs = useRef([]);

    const options = {
        isCaseSensitive: false,
        includeScore: true,
        includeMatches: true,
        threshold: 0.2,
        keys: ["roadName"],
    };

    const fuse = new Fuse(rows, options);

    const fuseFilter = (value) => {
        if (value.length === 0) {
            setListPlace(rows);
            return;
        }

        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setListPlace(items);
    };

    const handleFocus = () => {
        setTimeout(() => {
            setSearchBoxActive(true);
            fuseFilter(searchText);
        }, 200);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSearchBoxActive(false);
            setListPlace([]);
        }, 200);
    };

    const handleChange = (value) => {
        setSearchText(value);
        fuseFilter(value);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prevIndex) => {
                const newIndex =
                    prevIndex < listPlace.length - 1 ? prevIndex + 1 : 0;
                scrollToListItem(newIndex);
                return newIndex;
            });
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prevIndex) => {
                const newIndex =
                    prevIndex > 0 ? prevIndex - 1 : listPlace.length - 1;
                scrollToListItem(newIndex);
                return newIndex;
            });
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            setSelectedRoad(listPlace[highlightedIndex]);
            setSearchText(listPlace[highlightedIndex].roadName);
            setSearchBoxActive(false);
            setListPlace([]);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const scrollToListItem = (index) => {
        if (listItemRefs.current[index]) {
            listItemRefs.current[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    };

    useEffect(() => {
        setSearchText(selectedRoad?.roadName || searchText);
    }, [selectedRoad]);

    useEffect(() => {
        if (searchBoxActive) {
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [searchBoxActive, highlightedIndex, listPlace]);

    return (
        <div className="flex flex-col w-[80%] my-6">
            <div
                ref={searchBarBoxRef}
                className="searchBarBox"
                style={{ borderColor: searchBoxActive ? "#ff8700" : "#dae2ed" }}
            >
                <span className="searchBarIcon">
                    <img
                        alt="Detailed Report Search"
                        src={DetailedReportIcons.SearchIcon}
                    ></img>
                </span>
                <input
                    ref={inputRef}
                    value={searchText}
                    onBlur={handleBlur}
                    placeholder="Search Road"
                    onFocus={handleFocus}
                    className="reportSearchBarInput"
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            {searchBoxActive ? (
                <List
                    component="ul"
                    className={`searchBarList`}
                    aria-label="hidden"
                    style={{
                        width:
                            searchBarBoxRef?.current &&
                            searchBarBoxRef?.current?.offsetWidth,
                    }}
                >
                    {rowsLoading ? (
                        <Spinner height={"full"}/>
                    ) : rows && rows.length > 0 ? (
                        listPlace.map((item, key) => {
                            return (
                                <div
                                    key={key}
                                    ref={(el) =>
                                        (listItemRefs.current[key] = el)
                                    }
                                >
                                    <ListItemButton
                                        selected={highlightedIndex === key}
                                        onClick={() => {
                                            setSelectedRoad(item);
                                            setSearchText(item.roadName);
                                            setListPlace([]);
                                        }}
                                    >
                                        <ListItemText primary={item.roadName} />
                                    </ListItemButton>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: "center" }}>No Road Available!</div>
                    )}
                </List>
            ) : (
                <></>
            )}
        </div>
    );
}

export default DetailedReportSearchBox;
