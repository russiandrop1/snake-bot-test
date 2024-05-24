from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Updater, CommandHandler, CallbackContext

def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("Play Snake Game", web_app=WebAppInfo(url="https://github.com/russiandrop1/snake-bot-test.git"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Press the button to play the game!', reply_markup=reply_markup)

def main():
    updater = Updater("6305004926:AAHSGnXyHsPO-ltLN0ZTdkeG9RwFYKR_fus")
    updater.dispatcher.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
