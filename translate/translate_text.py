import json
import boto3

language={
    'Arabic': 'ar',
    'Chinese':'zh',
    'Chinese':'zh-TW',
    'Czech': 'cs',
    'Danish': 'da',
    'Dutch': 'nl',
    'English': 'en',
    'Finnish' :'fi',
    'French' : 'fr',
    'German' :'de',
    'Hebrew': 'he',
    'Indonesian' : 'id',
    'Italian': 'it',
    'Japanese': 'ja',
    'Korean' :'ko',
    'Polish' :'pl',
    'Portuguese': 'pt',
    'Russian': 'ru',
    'Spanish': 'es',
    'Swedish': 'sv',
    'Turkish': 'tr'
    }



def lambda_handler(event, context):
    
    input_text=event['text']
    voice_input=event['voice_input']
    voice_output=event['voice_output']
    if voice_input != 'auto':
        voice_input=language[voice_input]
    voice_output=language[voice_output]
    
    if input_text=="":
        return " "
    
    client = boto3.client('translate','us-east-1')
    try:
        response = client.translate_text(
        Text=input_text,
        SourceLanguageCode=voice_input,
        TargetLanguageCode=voice_output
    )    
    except Exception as e:
        return " "
    
    
    
    return response['TranslatedText']
    
