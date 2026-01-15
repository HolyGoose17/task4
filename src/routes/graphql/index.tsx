import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/graphql/')({
  component: GraphQLPage,
});

function GraphQLPage() {
  return <div>GraphQL</div>;
}
