from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackContext

async def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("Play Snake Game", web_app=WebAppInfo(url="https://github.com/russiandrop1/snake-bot-test.git"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Press the button to play the game!', reply_markup=reply_markup)

def main():
    application = Application.builder().token("6305004926:AAHSGnXyHsPO-ltLN0ZTdkeG9RwFYKR_fus").build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()

if __name__ == '__main__':
    main()
