

const CollectionItemPage = ({ params }: { params: { id: string } }) => {
    return (
      <div>
        <h1>Collection Item: {params.id}</h1>
      </div>
    );
  };
  
  export default CollectionItemPage;