import React, { Component } from "react"
import { Grid, withStyles, Card, Typography } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DirectoryList } from "../../plugins/Directory/DirectoryList"

const directoryPages = [
    {
        title: "Search Whole Directory",
        fixedTags: []
    },
    {
        title: "Search Diabetes",
        fixedTags: [{
            id: "9ad2a2e5-3011-49d5-a5f1-4d5e38189157",
            name: "Diabetes"
        }]
    }
]

const styles = theme => ({
    card: {
        borderRadius: 0,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    container: {
        width: "100%",
        height: "100%",
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: 100,
        backgroundColor: theme.palette.mainColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: "#fff",
        '&:hover': {
            cursor: "pointer",
        },
    },
    icon: {
        marginBottom: 10,
        zIndex: 99999999,
    },
    mainHeading: {
        margin: 0,
        zIndex: 99999999,
    },
    title: {
        marginBottom: 0,
        color: "#fff",
        fontSize: 20,
        fontWeight: 800,
        zIndex: 99999999,
    }
});

const DirectoryCard = (props) => {
    const { id, classes, title, icon, onPageSelected } = props;
    return (
        <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card} onClick={() => onPageSelected()}>
                <div id={id} className={classes.topBlock} aria-label={title}>
                    <FontAwesomeIcon icon={icon} size="2x" className={classes.icon} />
                    <h1 className={classes.mainHeading}>
                        <Typography className={classes.title}>
                            {title}
                        </Typography>
                    </h1>
                </div>
            </Card>
        </Grid>
    );
}

class Directory extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            page: null
        }
    }

    pageSelected = (pageIndex) => {
        this.setState({ page: directoryPages[pageIndex] })
    }
    
    render() {
        const { classes } = this.props

        const { page } = this.state

        if (page) {
            return <DirectoryList fixedTags={page.fixedTags} />
        } else {
            return (
                <Grid>
                    <Grid container spacing={16}>
                        {
                            directoryPages.map((page, key) => {
                                return (
                                    <DirectoryCard
                                        key={key} 
                                        title={page.title}
                                        classes={classes}
                                        onPageSelected={() => this.pageSelected(key)}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Grid>
            )
        }
    }
}

export default withStyles(styles)(Directory)