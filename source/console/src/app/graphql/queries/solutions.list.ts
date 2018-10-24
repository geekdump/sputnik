import gql from 'graphql-tag';

export default gql`
    query ListSolutions($limit: Int, $nextToken: String) {
        listSolutions(limit: $limit, nextToken: $nextToken) {
            solutions {
                id
                name
                description
                thingIds
                solutionBlueprintId
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;