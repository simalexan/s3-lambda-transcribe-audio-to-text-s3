
# S3 Bucket -> Lambda (AWS Transcribe Audio to Text) -> S3 Bucket

## Description

This is a serverless component that takes uploaded MP3, MP4, WAV, FLAC audio files from one S3 Bucket, then using Lambda and AWS Transcribe converts them to text and uploads to another S3 Bucket as JSON. It contains:

- an Input S3 Bucket that accepts MP3, MP4, WAV, FLAC audio files.

- a Lambda that takes the MP3, MP4, WAV, FLAC audio file from the Input S3 bucket, transcribes it to text and uploads it to the Output bucket

- an Output S3 Bucket that receives Text JSON files.

## Deployment Parameters

This component has one CloudFormation deployment parameter:

- `LanguageCode`, a required parameter, represents the language present in the audio file that the AWS Transcribe should detect. Possible values are:
'en-US','es-US','en-AU','fr-CA','en-GB','de-DE','pt-BR','fr-FR','it-IT','ko-KR','es-ES'

## Latest Release - 1.0.0

- Initial release.

## Roadmap - Upcoming changes

Here are the upcoming changes that I'll add to this serverless component:

- ESLint
- Tests
