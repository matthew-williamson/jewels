

export default class ShopifyQueries {
    ProductQuery(handleVal) {
        return `#graphql
  query {
    collectionByHandle(handle: String(handleVal)) {
      id
      title
      handle
      products(first: 250) {
        edges {
         node {
            id
            title
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            featuredImage{
              altText
              url
            }
          }
        }
      }
    }    
  }`;
    }
}