import React from "react"
import { Card, Typography, Grid, CardContent, Chip } from "@material-ui/core"
import { List, Filter, TextInput } from "react-admin"
import { withStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import backgroundImage from "../../images/Artboard.png"

const styles = {
    mainBackground: {
        padding: "24px",
        background: `url(${backgroundImage}) 0 0 repeat`
    }
};

const TagCardDisplay = ({ tags }) => {
    return (
        <React.Fragment>
            {
                tags.map((tag) => {
                    return <Chip 
                        key={tag.id}
                        label={tag.name}
                    />
                })
            }
        </React.Fragment>
    )
}

const DirectoryGrid = ({ ids, data, classes }) => {
    console.log(ids)
    console.log(data)

    return (
        <Grid className={classes.mainBackground} container spacing={24}>
        {
            ids.map((id) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography>
                                    { data[id].name }
                                </Typography>
                                <Typography>
                                    { data[id].intro }    
                                </Typography>
                                <div>
                                    <FontAwesomeIcon icon="user" size="2x" style={{ height: 20 }} />
                                    <Typography>{ data[id].contact_name }</Typography>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faPhone} size="2x" style={{ height: 20 }} />
                                    <Typography>{ data[id].contact_phone }</Typography>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon="at" size="2x" style={{ height: 20 }} />
                                    <Typography>{ data[id].contact_email }</Typography>
                                </div>
                                <TagCardDisplay tags={data[id].category_taxonomies} /> 
                            </CardContent>        
                        </Card>
                    </Grid>
                )
            })
        }
        </Grid>
    )
}

const DirectoryFilter = (props) => {
    return (
        <Filter {...props}>
            <TextInput label="Search" source="q" />
        </Filter>
    )
}

const DirectoryList = (props) => {
    return (
        <List {...props} filters={<DirectoryFilter />}>
            <DirectoryGrid classes={props.classes} />
        </List>
    )
}

const styled = withStyles(styles)(DirectoryList)

export { styled as DirectoryList }