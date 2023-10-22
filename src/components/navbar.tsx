import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import { GithubIcon, Twitter, Youtube } from 'lucide-react'

const Navbar = () => {
  return (
    <Card className="mx-auto mt-4 flex w-max items-center gap-2 px-2 py-1">
    <Link
      target="_blank"
      href="https://github.com/fahreziadh/bikinsoal.com"
    >
      <Button size={"icon"} variant="ghost">
        <GithubIcon size={18} />
      </Button>
    </Link>
    <Link
      target="_blank"
      href="https://www.youtube.com/channel/UCOhmLMgnGXcQIzeQihpHiYw"
    >
      <Button size={"icon"} variant="ghost">
        <Youtube size={18} />
      </Button>
    </Link>
    <Link href="https://twitter.com/fahreziadhaa" target="_blank">
      <Button size={"icon"} variant="ghost">
        <Twitter size={18} />
      </Button>
    </Link>
  </Card>
  )
}

export default Navbar