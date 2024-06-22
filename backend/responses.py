
r1 = 'You have not experienced any significant depression symptoms in the past two weeks. You may still have some occasional or mild mood fluctuations, but they do not interfere with your daily functioning or well-being. You can maintain your normal activities and relationships, and cope with stress and challenges effectively.'

r2 = 'You have experienced some depression symptoms in the past two weeks, but they are not severe or frequent enough to cause major distress or impairment. You may feel sad, hopeless, or tired more often than usual, but you can still manage your responsibilities and enjoy some aspects of your life. You may benefit from some self-care strategies, such as exercise, relaxation, or social support, to improve your mood and energy.'

r3 = 'You have experienced several depression symptoms in the past two weeks, and they have caused noticeable distress or impairment in your daily functioning or well-being. You may have difficulty finding interest or pleasure in things that you used to enjoy, or feel down, depressed, or hopeless most of the time. You may also have trouble sleeping, eating, concentrating, or making decisions. You may need professional help, such as counseling or medication, to treat your depression and prevent it from worsening.'

r4 = 'You have experienced most or all of the depression symptoms in the past two weeks, and they have caused significant distress or impairment in your daily functioning or well-being. You may feel very sad, hopeless, or worthless, and have little or no interest or pleasure in anything. You may also have severe problems with sleeping, eating, concentrating, or making decisions. You may have thoughts of harming yourself or others, or feel that life is not worth living. You should seek professional help as soon as possible, as you may be at risk of developing serious complications or consequences from your depression.'

r5 = 'You have experienced all of the depression symptoms in the past two weeks, and they have caused extreme distress or impairment in your daily functioning or well-being. You may feel extremely sad, hopeless, or worthless, and have no interest or pleasure in anything. You may also have very severe problems with sleeping, eating, concentrating, or making decisions. You may have frequent or persistent thoughts of harming yourself or others, or feel that life is not worth living. You should seek professional help immediately, as you may be in a life-threatening situation or crisis from your depression.'


def return_response(score):
    response_list = [r1, r2, r3, r4, r5]

    # score = 19
    response = response_list[int(score/5)] 

    print(response)

    return response