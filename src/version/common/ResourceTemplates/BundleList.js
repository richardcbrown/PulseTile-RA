import React, { Component } from "react"
import { connect } from "react-redux"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import { getFromBundle } from "../../fhir/GetFromBundle"
import { getFhirResourcesAction } from "../../actions/getFhirResourcesAction"
import BundlePagination from "../Buttons/BundlePagination"
import querystring from "querystring"

/** @typedef {{
 * bundle: fhir.Bundle,
 * query: object,
 * getBundle: (componentKey: string, resourceType: string, query: string) => void
 * componentKey: string
 * resourceType: string,
 * rowProvider: (resource: fhir.Resource) => JSX.Element,
 * headProvider: () => JSX.Element }}
 * BundleListProps */

class BundleList extends Component {
    /**
     *
     * @param {BundleListProps} props
     */
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { resourceType, query, getBundle, componentKey } = /** @type {BundleListProps} */ (this.props)

        getBundle(componentKey, resourceType, querystring.stringify(query))
    }

    /** @returns {JSX.Element | null} */
    render() {
        const props = this.props

        const { bundle, resourceType, componentKey, getBundle, rowProvider, headProvider, query } = props

        if (!bundle) {
            return null
        }

        const resources = getFromBundle(bundle, resourceType)

        return (
            <React.Fragment>
                <Table>
                    {headProvider()}
                    <TableBody>{resources.map((resource) => rowProvider(resource))}</TableBody>
                </Table>
                <BundlePagination
                    itemsPerPage={query._count}
                    bundle={bundle}
                    pageSelected={(query) => getBundle(componentKey, resourceType, querystring.stringify(query))}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { fhir } = state.custom

    const { componentKey, resourceType } = ownProps

    return {
        bundle:
            (fhir[componentKey] && fhir[componentKey][resourceType] && fhir[componentKey][resourceType].data) || null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBundle: (key, resourceType, query) => dispatch(getFhirResourcesAction.request(key, resourceType, query)),
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(BundleList)

export { connected as BundleList }
