import React, { Component } from "react"
import { Card, Typography, Grid, CardContent, Chip, TextField, Collapse, CardActions, IconButton } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { withStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faUser, faAt } from "@fortawesome/free-solid-svg-icons"
import backgroundImage from "../../images/Artboard.png"
import customDataProvider from "../../../core/dataProviders/dataProvider"
import DirectoryPagination from "./fragments/DirectoryPagination"
import TableHeader from "../../../core/common/TableHeader"

const styles = theme => ({
    container: {
        width: "100%",
        height: "100%",
        background: `url(${backgroundImage}) 0 0 repeat`
    },
    searchContainer: {
        backgroundColor: "#fff",
        padding: "24px"
    },
    resultsContainer: {
        padding: "24px"
    },
    chipItem: {
        marginRight: "4px",
        marginBottom: "4px"
    },
    cardHeader: {
        backgroundColor: theme.palette.mainColor,
        color: theme.palette.common.white
    },
    cardContact: {
        display: "flex"
    },
    cardVideo: {
        padding: 0
    }
})

const TagDisplay = ({ tags, tagSelected, onDelete, classes }) => {
    return (
        <React.Fragment>
            {
                tags.map((tag) => {
                    if (tag.fixed) {
                        return <Chip
                            className={classes.chipItem}
                            key={tag.id}
                            label={tag.name}
                        />
                    } else if (onDelete) {
                        return <Chip
                            className={classes.chipItem} 
                            key={tag.id}
                            label={tag.name}
                            onClick={() => tagSelected && tagSelected(tag)}
                            onDelete={() => onDelete(tag)}
                        />
                    } else {
                        return <Chip 
                            className={classes.chipItem}
                            key={tag.id}
                            label={tag.name}
                            onClick={() => tagSelected && tagSelected(tag)}
                        />
                    }
                })
            }
        </React.Fragment>
    )
}

class YouTubeCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false
        }
    }

    handleExpandClick = () => {
        const { expanded } = this.state

        this.setState({ expanded: !expanded })
    }

    render() {
        const { resource, tagSelected, classes } = this.props
        const { embeddedLink } = resource
        const { expanded } = this.state

        resource.category_taxonomies = resource.category_taxonomies || []

        return (
            <Card>
                <CardContent className={classes.cardHeader}>
                    <Typography variant="h5" className>
                        { resource.name }
                    </Typography>
                </CardContent>
                <CardContent className={classes.cardVideo}>
                    { embeddedLink && 
                            <iframe width="100%" height="250" src={embeddedLink} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    }
                </CardContent>
                { 
                    resource.intro &&
                    <CardContent>
                        <Typography>
                            { resource.description }    
                        </Typography>
                    </CardContent>
                }
                <CardContent>
                    <TagDisplay tags={resource.category_taxonomies.slice(0, 3)} tagSelected={tagSelected} classes={classes} /> 
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={this.handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TagDisplay tags={resource.category_taxonomies.slice(3)} tagSelected={tagSelected} classes={classes} /> 
                    </CardContent>
                </Collapse>        
            </Card>
        )
    }
}

class DefaultCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false
        }
    }

    handleExpandClick = () => {
        const { expanded } = this.state

        this.setState({ expanded: !expanded })
    }

    render() {
        const { resource, tagSelected, classes } = this.props
        const { expanded } = this.state

        resource.category_taxonomies = resource.category_taxonomies || []

        return (
            <Card>
                <CardContent className={classes.cardHeader}>
                    <Typography variant="h5">
                        { resource.name }
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                        { resource.description }      
                    </Typography>
                </CardContent>
                <CardContent>
                    {   
                        resource.contact_name && 
                        <div className={classes.cardContact}>
                            <FontAwesomeIcon icon={faUser} size="2x" style={{ height: 20 }} />
                            <Typography>{ resource.contact_name }</Typography>
                        </div>
                    }
                    {
                        resource.contact_phone &&
                        <div className={classes.cardContact}>
                            <FontAwesomeIcon icon={faPhone} size="2x" style={{ height: 20 }} />
                            <Typography>{ resource.contact_phone }</Typography>
                        </div>
                    }
                    {
                        resource.contact_email &&
                        <div className={classes.cardContact}>
                            <FontAwesomeIcon icon={faAt} size="2x" style={{ height: 20 }} />
                            <Typography>{ resource.contact_email }</Typography>
                        </div>
                    }
                </CardContent>
                <CardContent>
                    <TagDisplay tags={resource.category_taxonomies.slice(0, 3)} tagSelected={tagSelected} classes={classes} /> 
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={this.handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TagDisplay tags={resource.category_taxonomies.slice(3)} tagSelected={tagSelected} classes={classes} /> 
                    </CardContent>
                </Collapse>         
            </Card>
        )
    }
}

const getTileForType = (serviceOrResource, tagSelected, classes) => {
    const { tileType } = serviceOrResource
    
    switch (tileType) {
        case "youtube": {
            return <YouTubeCard resource={serviceOrResource} tagSelected={tagSelected} classes={classes} />
        }
        default: {
            return <DefaultCard resource={serviceOrResource} tagSelected={tagSelected} classes={classes} />
        }
    }
}

const DirectoryGrid = ({ data, classes, tagSelected }) => {
    return (
        <Grid container spacing={16} className={classes.resultsContainer}>
        {
            data.map((d) => {
                return (
                    <Grid item xs={12} sm={6} md={4}>
                        {getTileForType(d, tagSelected, classes)}
                    </Grid>
                )
            })
        }
        </Grid>
    )
}

class DirectoryList extends Component {

    constructor(props) {
        super(props)

        const { fixedTags } = props

        fixedTags.forEach((tag) => tag.fixed = true)

        this.state = {
            serviceOrResourceName: "",
            tags: fixedTags,
            page: 1,
            searchResults: {}
        }
    }

    componentDidMount() {
        const { serviceOrResourceName, tags } = this.state

        if (tags.length) {
            this.searchParametersChanged({ serviceOrResourceName, tags })
        }
    }

    tagSelected = (tag) => {
        const { tags } = this.state

        if (tags.some((t) => t.id === tag.id)) {
            return
        }

        const newTags = [...tags, tag]

        this.tagChanged(newTags)
    }

    tagRemoved = (tag) => {
        if (tag.fixed) {
            return
        }

        const { tags } = this.state

        const filtered = tags.filter((t) => t.id !== tag.id)

        this.tagChanged(filtered)
    }

    tagChanged = (tags) => {
        this.setState({ tags, page: 1 }, () => this.searchParametersChanged())
    }

    pageSelected = (page) => {
        this.setState({ page }, () => this.searchParametersChanged())
    }

    searchParametersChanged = () => {
        const { tags, serviceOrResourceName, page } = this.state

        customDataProvider("GET_LIST", "directory", { 
                q: serviceOrResourceName, 
                tags: tags.map((t) => t.id).join(","),
                page: page
            })
            .then(res => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        searchResults: res
                    }
                })
            });
    }

    debounceNameSearch = (serviceOrResourceName) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                serviceOrResourceName,
                page: 1
            }
        }, () => {       
            if (this.timeout) {
                clearTimeout(this.timeout)
            }

            this.timeout = setTimeout(() => this.searchParametersChanged(), 300)
        })
    }

    render() {
        const { tags, serviceOrResourceName, searchResults, page } = this.state
        const { classes } = this.props

        const results = searchResults.data || []

        const { lastPage } = searchResults

        return (
            <Grid className={classes.container} >
                <TableHeader resource="directory" />

                <div className={classes.searchContainer}>
                    <TextField 
                        value={serviceOrResourceName} 
                        onChange={(e) => this.debounceNameSearch(e.target.value)} 
                        label="Search Service or Resource name"
                        fullWidth
                    />
                    <TagDisplay tags={tags} onDelete={this.tagRemoved} classes={classes} />
                </div>

                <DirectoryGrid classes={classes} data={results} tagSelected={this.tagSelected} />

                { results.length && <DirectoryPagination page={page} pageSelected={this.pageSelected} lastPage={lastPage} /> }
            </Grid>
        )
    }
}

const styled = withStyles(styles)(DirectoryList)

export { styled as DirectoryList }