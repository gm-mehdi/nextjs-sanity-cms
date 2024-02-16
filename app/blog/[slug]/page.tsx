import { client } from "@/app/lib/sanity";
import { fullBlogCard } from "@/lib/interface";

async function getData(params: string) {
    const query = `
    *[_type == 'blog' && slug.current == '${params}'] {
      title,
      "currentSlug": slug.current,
      "contentText": content[0].children[0].text,
      "imageUrl": titleImage.asset->url
      
    }[0]`;
  
    const data = await client.fetch(query);
    return data;
  }

export default async function blogArticle({params}: {params: {slug: string}}) {
    const data: fullBlogCard[] = await getData(params.slug);
    console.log(data);

    return(
        <h1>{params.slug}</h1>
        // HNAYA LES DETAILS DYAL DAK BLOG
        // IM LAZY TO DO IT KAMAL MNE 3ANDAK
    )
}
