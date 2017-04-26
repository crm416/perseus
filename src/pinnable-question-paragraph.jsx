/* eslint-disable */
const React = require("react");

const BookmarkFullIcon = ({ color, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...rest}
    >
        <g fill="none" fill-rule="evenodd">
            <path fill="none" d="M0 0h24v24H0z" opacity=".5" />
            <path
                fill="currentColor"
                d="M4 2.005A2 2 0 0 1 5.994 0h12.012A2 2 0 0 1 20 2.005v20.994c0 .553-.408.797-.887.558L12 20l-7.113 3.557c-.49.245-.887-.004-.887-.558V2.005z"
            />
        </g>
    </svg>
);

// TODO(kevinb): optimize svg
const BookmarkEmptyIcon = ({ color, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        {...rest}
    >
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(6 -270)">
                <path d="M0 0h600v250H0z" />
                <text
                    fill="#BABEC2"
                    font-family="ProximaNova-Semibold, Proxima Nova"
                    font-size="20"
                    font-weight="500"
                >
                    <tspan x="0" y="18">
                        Zeplin comment color-coding system:
                    </tspan>
                </text>
                <text
                    fill="#BABEC2"
                    font-family="ProximaNova-Semibold, Proxima Nova"
                    font-size="20"
                    font-weight="500"
                >
                    <tspan x="40" y="66">Questions and discussions</tspan>
                </text>
                <text
                    fill="#BABEC2"
                    font-family="ProximaNova-Semibold, Proxima Nova"
                    font-size="20"
                    font-weight="500"
                >
                    <tspan x="40" y="106">Resolved threads & notes</tspan>
                </text>
                <circle cx="12" cy="60" r="12" fill="#FFCF32" />
                <circle cx="12" cy="100" r="12" fill="#0DCFDA" />
            </g>
            <path fill="none" d="M0 0h24v24H0z" opacity=".5" />
            <path
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
                d="M19 22.382l-6.553-3.276-.447-.224-.447.224L5 22.382V2.005A1 1 0 0 1 5.994 1h12.012A1 1 0 0 1 19 2.005v20.377z"
            />
        </g>
    </svg>
);

export const BookmarkEmptyButton = ({ color, hoverColor, onClick }) => (
    <IconButton onClick={onClick} color={color} hoverColor={hoverColor}>
        <BookmarkEmptyIcon />
    </IconButton>
);

export const BookmarkFullButton = ({ color, hoverColor, onClick }) => (
    <IconButton onClick={onClick} color={color} hoverColor={hoverColor}>
        <BookmarkFullIcon />
    </IconButton>
);

const IconButton = ({ color, hoverColor, children, onClick, padding = 12 }) => (
    <HoverBehavior onClick={onClick}>
        {({ hovered }, handlers) => (
            <span
                style={{
                    padding: padding,
                    color: hovered ? hoverColor : color,
                    cursor: "pointer",
                    display: "inline-block",
                    lineHeight: 0,
                }}
                {...handlers}
            >
                {children}
            </span>
        )}
    </HoverBehavior>
);

const Bookmark = ({ pinned, visible, onPin, onUnpin, colors }) =>
    (visible
        ? pinned
              ? <BookmarkFullButton
                    color={colors.active}
                    hoverColor={colors.hover}
                    onClick={onUnpin}
                />
              : <BookmarkEmptyButton
                    color={colors.inactive}
                    hoverColor={colors.hover}
                    onClick={onPin}
                />
        : <span
              style={{
                  width: 24,
                  height: 24,
                  flex: 0,
                  display: "inline-block",
                  margin: 12,
                  lineHeight: 0,
              }}
          />);

const HoverBehavior = React.createClass({
    getDefaultProps: function() {
        return {
            shouldUpdate: () => true,
        };
    },

    getInitialState: function() {
        return {
            focused: false,
            hovered: false,
        };
    },

    handleClick: function(e) {
        if (this.props.shouldUpdate()) {
            this.waitingForClick = false;
        }
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    },

    handleMouseEnter: function() {
        if (this.props.shouldUpdate() && !this.waitingForClick) {
            this.setState({ hovered: true });
        }
    },

    handleMouseLeave: function() {
        if (this.props.shouldUpdate() && !this.waitingForClick) {
            this.setState({ hovered: false });
        }
    },

    handleTouchStart: function() {
        if (this.props.shouldUpdate()) {
            this.setState({ hovered: true });
        }
    },

    handleTouchEnd: function() {
        if (this.props.shouldUpdate()) {
            this.setState({ hovered: false });
            this.waitingForClick = true;
        }
    },

    handleMouseDown: function() {
        if (this.props.shouldUpdate()) {
            this.setState({ focused: false });
            this.focusFlag = true;
        }
    },

    handleBlur: function() {
        if (this.props.shouldUpdate()) {
            this.setState({ focused: false });
        }
    },

    handleFocus: function() {
        if (this.props.shouldUpdate()) {
            if (this.focusFlag) {
                this.focusFlag = false;
            } else {
                this.setState({ focused: true });
            }
        }
    },

    render() {
        const handlers = {
            onBlur: this.handleBlur,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
        };

        const { children } = this.props;

        return children && children(this.state, handlers);
    },
});

const star = {
    path: "M100.806 37.259q0 1.325-1.59 2.915l-21.995 21.412 5.194 30.316q.265 2.279-.424 3.233-.795 1.007-1.961 1.007t-2.438-.742l-27.189-14.31-27.189 14.31q-1.378.742-2.544.742t-1.802-.901-.636-1.696.106-1.643l5.247-30.316-22.048-21.412q-1.537-1.643-1.537-2.915 0-2.226 3.392-2.809l30.422-4.399 13.621-27.56q1.166-2.491 2.968-2.491t2.968 2.491l13.621 27.56 30.422 4.399q3.392.583 3.392 2.809z", // @Nolint
    width: 100,
    height: 95.373,
};

const starEmpty = {
    path: "M68.847 58.883l18.55-17.967-25.546-3.763-11.448-23.161-11.448 23.161-25.546 3.763 18.497 17.967-4.399 25.493 22.896-12.031 22.843 12.031zm31.959-21.624q0 1.325-1.59 2.915l-21.995 21.412 5.194 30.316q.053.424.106 1.219 0 3.021-2.491 3.021-1.166 0-2.438-.742l-27.189-14.31-27.189 14.31q-1.378.742-2.544.742t-1.802-.901-.636-1.696.106-1.643l5.247-30.316-22.048-21.412q-1.537-1.643-1.537-2.915 0-2.226 3.392-2.809l30.422-4.399 13.621-27.56q1.166-2.491 2.968-2.491t2.968 2.491l13.621 27.56 30.422 4.399q3.392.583 3.392 2.809z", // @Nolint
    width: 100,
    height: 95.373,
};

const BookmarkIcon = React.createClass({
    render() {
        const { active, colors, hovered } = this.props;
        return (
            <Icon
                icon={active ? star : starEmpty}
                color={
                    hovered
                        ? colors.hover
                        : active ? colors.active : colors.default
                }
                size={20}
            />
        );
    },
});

const PinnableQuestionParagraph = React.createClass({
    getInitialState() {
        return {
            contentHovered: false,
            iconHovered: false,
            pinned: false,
        };
    },

    render: function() {
        const {
            filterUnpinnedNodes,
            onPinChange,
            pinColors,
        } = this.props.apiOptions;

        var className = this.props.className
            ? "paragraph " + this.props.className
            : "paragraph";
        const { contentHovered, iconHovered, pinned } = this.state;
        const hovered = contentHovered || iconHovered;

        // For perseus-article just-in-place-translation (jipt), we need
        // to attach some metadata to top-level QuestionParagraphs:
        return (
            <div
                style={{
                    position: "relative",
                    ...(filterUnpinnedNodes && !pinned
                        ? { display: "none" }
                        : {}),
                }}
                className={className}
                data-perseus-component-index={this.props.translationIndex}
                data-perseus-paragraph-index={this.props.paragraphIndex}
                onMouseEnter={() => this.setState({ contentHovered: true })}
                onMouseLeave={() => this.setState({ contentHovered: false })}
            >
                {this.props.children}
                <div
                    style={{
                        position: "absolute",
                        top: -8,
                        right: -63,
                        paddingLeft: 704,
                    }}
                    onMouseEnter={() => this.setState({ iconHovered: true })}
                    onMouseLeave={() => this.setState({ iconHovered: false })}
                >
                    <Bookmark
                        pinned={pinned}
                        visible={hovered || pinned}
                        colors={pinColors}
                        onPin={() => {
                            this.setState({ pinned: true }, () =>
                                onPinChange(true),
                            );
                        }}
                        onUnpin={() => {
                            this.setState({ pinned: false }, () =>
                                onPinChange(false),
                            );
                        }}
                    />
                </div>
            </div>
        );
    },
});

module.exports = PinnableQuestionParagraph;
