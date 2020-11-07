import Config from '~/config/Config';
import SoundQueue from '~/queue/SoundQueue';

import CommandCollection from '../bot/CommandCollection';
import {
  AvatarCommand,
  ConfigCommand,
  IgnoreCommand,
  UnignoreCommand
} from '../bot/commands/config';
import {
  HelpCommand,
  LastAddedCommand,
  MostPlayedCommand,
  PingCommand,
  WelcomeCommand
} from '../bot/commands/help';
import {
  AddCommand,
  DownloadCommand,
  EntranceCommand,
  ExitCommand,
  RemoveCommand,
  RenameCommand,
  SearchCommand,
  SoundsCommand,
  StopCommand,
  TagCommand,
  TagsCommand
} from '../bot/commands/manage';
import {
  ComboCommand,
  LoopCommand,
  NextCommand,
  RandomCommand,
  SkipCommand,
  SoundCommand
} from '../bot/commands/sound';
import AttachmentDownloader from '../bot/commands/util/downloader/AttachmentDownloader';
import AttachmentValidator from '../bot/commands/util/downloader/validator/AttachmentValidator';
import YoutubeValidator from '../bot/commands/util/downloader/validator/YoutubeValidator';
import YoutubeDownloader from '../bot/commands/util/downloader/YoutubeDownloader';
import MessageHandler from '../bot/MessageHandler';
import SoundBot from '../bot/SoundBot';

export const config = new Config();
const queue = new SoundQueue(config);

const attachmentValidator = new AttachmentValidator(config);
const attachmentDownloader = new AttachmentDownloader(attachmentValidator);

const youtubeValidator = new YoutubeValidator();
const youtubeDownloader = new YoutubeDownloader(youtubeValidator);

const commands = [
  new PingCommand(),

  // SOUND PLAYING RELATED COMMANDS
  new SoundCommand(queue),
  new ComboCommand(queue),
  new RandomCommand(queue),
  new LoopCommand(queue),
  new NextCommand(queue),
  new SkipCommand(queue),
  new StopCommand(queue),

  // ENTRANCE / EXIT SOUNDS
  new EntranceCommand(),
  new ExitCommand(),

  // SOUND ADMINISTRATION COMMANDS
  new AddCommand(attachmentDownloader, youtubeDownloader),
  new SoundsCommand(config),
  new SearchCommand(),
  new RenameCommand(),
  new RemoveCommand(),
  new TagCommand(),
  new TagsCommand(),
  new DownloadCommand(),

  // HELP / INFO COMMANDS
  new WelcomeCommand(config),
  new HelpCommand(config),
  new LastAddedCommand(),
  new MostPlayedCommand(),

  // CONFIGURATION RELATED COMMANDS
  new AvatarCommand(config),
  new ConfigCommand(config),
  new IgnoreCommand(),
  new UnignoreCommand()
];

const commandCollection = new CommandCollection(commands);
const messageHandler = new MessageHandler(commandCollection);

const soundBot = new SoundBot(config, commandCollection, messageHandler, queue);

interface SoundBotContainer {
  config: Config;
  soundBot: SoundBot;
}

export default {
  config,
  soundBot
} as SoundBotContainer;
