import { simpleBlogCard } from "@/lib/interface";
import { client } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt asc) {
    title,
    smalldescription,  
    "currentSlug": slug.current,
    "contentText": content[0].children[0].text,
    "imageUrl": titleImage.asset->url
    
  }`;

  const data = await client.fetch(query);
  return data;
}


export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {
        data.map((item, idx) => {
          return (
            <Card key={idx} className="">
              <Image
                src={item.imageUrl}
                alt="image"
                width={500}
                height={500}
                className="rounded-t-lg h-[200px] w-full object-cover"
              />
              <CardContent className="mt-5">
                <h3 className="text-lg line-clamp-2 font-bold">{item.title}</h3>
                <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{item.smalldescription}</p>
                <Button asChild className="mt-5 w-full">
                  <Link href={`/blog/${item.currentSlug}`}>Read more</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  );
}
