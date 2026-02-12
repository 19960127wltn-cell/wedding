"""
Simple video compression using opencv-python
"""
import os
import sys
import subprocess

def compress_with_handbrake():
    """Try using HandBrakeCLI if available"""
    input_path = "public/images/main/main_video.mp4"
    output_path = "public/images/main/main_video_compressed.mp4"
    backup_path = "public/images/main/main_video_original.mp4"
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found!")
        return False
    
    # Backup original
    if not os.path.exists(backup_path):
        print("Creating backup...")
        import shutil
        shutil.copy2(input_path, backup_path)
    
    # Try HandBrakeCLI
    try:
        cmd = [
            "HandBrakeCLI",
            "-i", input_path,
            "-o", output_path,
            "--preset", "Fast 1080p30",
            "-q", "28"
        ]
        subprocess.run(cmd, check=True)
        
        # Check size
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"Compressed to {size_mb:.2f} MB")
        
        if size_mb < 10:
            os.replace(output_path, input_path)
            print("Success! Video compressed.")
            return True
    except:
        pass
    
    return False

def manual_instructions():
    """Provide manual instructions"""
    print("\n" + "="*60)
    print("비디오 압축이 필요합니다")
    print("="*60)
    print("\n다음 방법 중 하나를 선택하세요:\n")
    print("방법 1: 온라인 도구 사용 (가장 쉬움)")
    print("  1. https://www.freeconvert.com/video-compressor 방문")
    print("  2. public/images/main/main_video.mp4 업로드")
    print("  3. 목표 크기를 8-10MB로 설정")
    print("  4. 압축된 파일을 다운로드하여 원본 파일 교체")
    print()
    print("방법 2: HandBrake 사용 (무료 프로그램)")
    print("  1. https://handbrake.fr/ 에서 다운로드")
    print("  2. main_video.mp4 열기")
    print("  3. Preset: 'Fast 1080p30' 선택")
    print("  4. Quality: RF 28-30 설정")
    print("  5. 인코딩 후 원본 파일 교체")
    print()
    print("방법 3: FFmpeg 설치 후 사용")
    print("  1. https://www.gyan.dev/ffmpeg/builds/ 에서 다운로드")
    print("  2. PATH에 추가")
    print("  3. 다음 명령어 실행:")
    print("     ffmpeg -i public/images/main/main_video.mp4 \\")
    print("            -vcodec h264 -crf 28 -preset medium \\")
    print("            -acodec aac -b:a 96k \\")
    print("            public/images/main/main_video_new.mp4")
    print()
    print("="*60)
    print(f"현재 파일 크기: {os.path.getsize('public/images/main/main_video.mp4') / (1024*1024):.2f} MB")
    print("목표 크기: 8-10 MB")
    print("="*60)

if __name__ == "__main__":
    if not compress_with_handbrake():
        manual_instructions()
