import { client } from "@/app/lib/sanity";
import { fullBlogCard } from "@/lib/interface";
import Image from "next/image";

export const revalidate = 30;

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

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const data: fullBlogCard = await getData(params.slug);

  return (
    <div>
      <h1>
        <span className="block text-center text-primary font-semibold tracking-wide uppercase">BLOG1</span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
      </h1>
      <Image
        src={data.imageUrl}
        alt={data.title}
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16">
        {
          data.contentText
        }
      </div>
    </div>
    // HNAYA LES DETAILS DYAL DAK BLOG
    // IM LAZY TO DO IT KAMAL MNE 3ANDAK
  )
}
