import React, { Component } from "react"
import { Card, Typography, Grid, CardContent, Chip, TextField } from "@material-ui/core"
import { List, Filter, TextInput } from "react-admin"
import { withStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faUser, faAt } from "@fortawesome/free-solid-svg-icons"
import backgroundImage from "../../images/Artboard.png"
import customDataProvider from "../../../core/dataProviders/dataProvider"
import DirectoryPagination from "./fragments/DirectoryPagination"
import TableHeader from "../../../core/common/TableHeader"

const styles = {
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
    }
}

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

const YouTubeCard = ({ resource, tagSelected, classes }) => {
    
    const { embeddedLink } = resource
    
    return (
        <Card>
            <CardContent>
                <Typography variant="subheading">
                    { resource.name }
                </Typography>
                <Typography>
                    { resource.intro }    
                </Typography>
                { embeddedLink && 
                    <div>
                        <iframe height="200" src={embeddedLink} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div> 
                }
                <TagDisplay tags={resource.category_taxonomies} tagSelected={tagSelected} classes={classes} /> 
            </CardContent>        
        </Card>
    )
}

const DefaultCard = ({ resource, tagSelected, classes }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="subheading">
                    { resource.name }
                </Typography>
                <Typography>
                    { resource.intro }    
                </Typography>
                {   
                    resource.contact_name && 
                    <div>
                        <FontAwesomeIcon icon={faUser} size="2x" style={{ height: 20 }} />
                        <Typography>{ resource.contact_name }</Typography>
                    </div>
                }
                {
                    resource.contact_phone &&
                    <div>
                        <FontAwesomeIcon icon={faPhone} size="2x" style={{ height: 20 }} />
                        <Typography>{ resource.contact_phone }</Typography>
                    </div>
                }
                {
                    resource.contact_email &&
                    <div>
                        <FontAwesomeIcon icon={faAt} size="2x" style={{ height: 20 }} />
                        <Typography>{ resource.contact_email }</Typography>
                    </div>
                }
                <TagDisplay tags={resource.category_taxonomies} tagSelected={tagSelected} classes={classes} /> 
            </CardContent>        
        </Card>
    )
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
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        {getTileForType(d, tagSelected, classes)}
                    </Grid>
                )
            })
        }
        </Grid>
    )
}

// const TestInput = (props) => {

//     console.log(props)

//     const handleChange = eventOrValue => {
//         props.input.onChange(eventOrValue);
//     };

//     handleChange(props.tags.map((t) => t.label).join(','))

//     return (
//         <div>
//             {/* <TextInput source="tags" style={{ display: "none" }} alwaysOn value={props.tags.join(',')} /> */}
//             <div>{JSON.stringify(props)}</div>
//             <TagDisplay tags={props.tags} />
//         </div>
//     )
// }

class TestInput extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            tags: []
        }
    }

    stateHandler = (tags) => {
        this.setState({ tags }, () => this.state.tags.map((t) => t.label).join(','))
    }
    
    render() {
        return (
            <div>
                {/* <TextInput source="tags" style={{ display: "none" }} alwaysOn value={props.tags.join(',')} /> */}
                <div>{JSON.stringify(this.state.tags)}</div>
                <TagDisplay tags={this.state.tags} />
            </div>
        )
    }
}

// const DirectoryFilter = (props) => {
//     return (
//         <Filter {...props}>
//             <TextInput label="Search" source="q" alwaysOn />
//             <TestInput label="Search Tags" source="tags" alwaysOn tags={props.tags} />
//         </Filter>
//     )
// }

class DirectoryFilter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tags: []
        }

        this.inputRef = React.createRef();
    }

    stateHandler = (tags) => {
        this.setState({ tags }, () => {
            if(this.inputRef && this.inputRef.current && this.inputRef.current.stateHandler) {
                this.inputRef.current.stateHandler(this.state.tags)
            }
        })
    }

    render() {
        return (
            <Filter {...this.props}>
                <TextInput label="Search" source="q" alwaysOn />
                <TestInput label="Search Tags" source="tags" alwaysOn tags={this.state.tags} ref={this.inputRef} />
            </Filter>
        )  
    }
}

class DirectoryList extends Component {

    constructor(props) {
        super(props)

        const { fixedTags } = props

        fixedTags.forEach((tag) => tag.fixed = true)

        this.state = {
            serviceOrResourceName: "",
            tags: fixedTags,
            results: []
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
        this.setState({ tags }, () => this.searchParametersChanged())
    }

    searchParametersChanged = () => {
        const { tags, serviceOrResourceName } = this.state

        customDataProvider("GET_LIST", "directory", { q: serviceOrResourceName, tags: tags.map((t) => t.id).join(",") })
            .then(res => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        results: res.data
                    }
                })
            });
    }

    debounceNameSearch = (serviceOrResourceName) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                serviceOrResourceName
            }
        }, () => {       
            if (this.timeout) {
                clearTimeout(this.timeout)
            }

            this.timeout = setTimeout(() => this.searchParametersChanged(), 300)
        })
    }

    render() {
        const { tags, serviceOrResourceName, results } = this.state
        const { classes } = this.props

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

                { results.length && <DirectoryPagination /> }
            </Grid>
            // <List {...this.props} tags={tags} filterDefaultValues={{ tags }} filters={<DirectoryFilter tags={tags} ref={this.filterRef} />}>
            //     <DirectoryGrid classes={this.props.classes} tagSelected={this.tagSelected} />
            // </List>
        )
    }
}

const styled = withStyles(styles)(DirectoryList)

export { styled as DirectoryList }