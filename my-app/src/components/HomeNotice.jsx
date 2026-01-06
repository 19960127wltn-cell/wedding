"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function HomeNotice() {
  const [open, setOpen] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    // Open on mount
    setOpen(true)
    
    // Check media query
    const media = window.matchMedia("(min-width: 1280px)")
    const onChange = () => setIsDesktop(media.matches)
    
    media.addEventListener("change", onChange)
    setIsDesktop(media.matches)
    
    return () => media.removeEventListener("change", onChange)
  }, [])

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>🎉 2026년 새해 맞이 이벤트</DialogTitle>
            <DialogDescription>
              Vue Photobuth와 함께 특별한 순간을 기록하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="space-y-4">
              <h4 className="font-medium leading-none">혜택 안내</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                <li>전 상품 10% 얼리버드 할인</li>
                <li>프리미엄 포토북 무료 업그레이드</li>
                <li>무제한 인화 서비스 제공</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                * 이벤트 기간: 2026.01.01 ~ 2026.01.31
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>🎉 2026년 새해 맞이 이벤트</DrawerTitle>
          <DrawerDescription>
            Vue Photobuth와 함께 특별한 순간을 기록하세요.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pt-0">
          <div className="space-y-4">
              <h4 className="font-medium leading-none">혜택 안내</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                <li>전 상품 10% 얼리버드 할인</li>
                <li>프리미엄 포토북 무료 업그레이드</li>
                <li>무제한 인화 서비스 제공</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                * 이벤트 기간: 2026.01.01 ~ 2026.01.31
              </p>
            </div>
            <Button className="w-full mt-4" onClick={() => setOpen(false)}>닫기</Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
