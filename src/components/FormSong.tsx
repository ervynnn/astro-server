import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sanitize from "sanitize-html";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReusableSelect from "@/components/reusable/select";
import { ToastComponent } from "@/components/reusable/toast";
// types
import type { Song } from '@/data/type/song';

const categoryOptions = ['JPop', 'Rock', 'Alternative', 'Ballad'];

const formSchema = z.object({
    title: z.string().nonempty("Title is required."),
    author: z.string().nonempty("Author is required."),
    category: z.string().nonempty("Category is required."),
    img: z.string().nonempty("Image URL is required."),
    releaseDate: z.string().nonempty("Release date is required."),
    ytlink: z.string().nonempty("YouTube link is required."),
    lyrics: z.string().nonempty("Lyrics are required."),
})

export function FormSong({ song }: {song?: Song | null}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      ...song,
      category: (song?.category) as unknown as string || categoryOptions[0],
      releaseDate:  new Date().toISOString().split("T")[0] },
  })

  // for function
  async function onSubmit(values: z.infer<typeof formSchema>) {
      let res;
      if(!song?.id){
        const title = sanitize(values.title as string);
        const author = sanitize(values.author as string);
        const category = sanitize(values.category as string);
        const img = sanitize(values.img as string);
        const releaseDate = sanitize(values.releaseDate as string);
        const ytlink = sanitize(values.ytlink as string);
        const lyrics = sanitize(values.lyrics as string);

        res = await fetch(`${import.meta.env.SITE}/api/songs.json`, {
          method: "POST",
          body: JSON.stringify({
            title,
            author,
            category,
            img,
            releaseDate,
            ytlink,
            lyrics
          })
        });
      }else{
        res = await fetch(`${import.meta.env.SITE}/api/songs/${song.id}.json`, {
          method: "POST",
          body: JSON.stringify({ ...values, id: song.id })
        });
      }
      const result = await res.json();
      if ( res.status == 200 ){
        ToastComponent({
          message: "Song has been added/updated.",
          description: result.message,
          variant: "success",
          });
      }
      else
        ToastComponent({
          message: "Error occured.",
          description: result.error,
          variant: "destructive",
          });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title here.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author here.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ytlink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter yt link here.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter img link here.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics</FormLabel>
              <FormControl>
                <ReusableSelect items={categoryOptions} {...field} onValueChange={(e) => {field.onChange(e); }}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter lyrics here.."
                          className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                This is lyrics of the song.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
